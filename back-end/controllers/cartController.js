import pool from "../db-config.js";
import { getUserIdByUsername } from "../utils/getUserIdByUsername.js";


const getCartIdentity = async (req) => {
    const isUser = !!req.user;

    const column = isUser ? "user_id" : "session_id";

    const value = isUser
        ? await getUserIdByUsername(req.user.username)
        : req.cartSessionId;

    return { isUser, column, value };
};


export const getCart = async (req, res) => {
    const { column, value } = await getCartIdentity(req);

    try {
        const { rows } = await pool.query(
            `
            SELECT ci.*, p.name, p.price, p.stock, p.image_url, p.brand  
            FROM cart_items ci
            JOIN products p ON ci.product_id = p.product_id
            WHERE ${column} = $1
            `,
            [value]
        );

        res.json({ cartItems: rows });
    } catch (e) {
        console.error("Error en getCart:", e);
        res.status(500).json({ error: "Error al obtener carrito" });
    }
};


export const addToCart = async (req, res) => {
    const { product_id, quantity } = req.body;

    if (!product_id || !quantity) {
        return res.status(400).json({ error: "Faltan datos" });
    }

    try {
        const { isUser, column, value } = await getCartIdentity(req);

        const { rows } = await pool.query(
            `
            SELECT * FROM cart_items
            WHERE product_id = $1
            AND ${column} = $2
            LIMIT 1
            `,
            [product_id, value]
        );

        if (rows.length > 0) {
            await pool.query(
                `
                UPDATE cart_items
                SET quantity = quantity + $1
                WHERE id = $2
                `,
                [quantity, rows[0].id]
            );
        } else {
            await pool.query(
                `
                INSERT INTO cart_items (user_id, session_id, product_id, quantity)
                VALUES ($1, $2, $3, $4)
                `,
                isUser
                    ? [value, null, product_id, quantity]
                    : [null, value, product_id, quantity]
            );
        }

        const { rows: updated } = await pool.query(
            `
            SELECT ci.*, p.name, p.price, p.stock, p.image_url, p.brand
            FROM cart_items ci
            JOIN products p ON ci.product_id = p.product_id
            WHERE ${column} = $1
            `,
            [value]
        );

        res.json({ cartItems: updated });
    } catch (e) {
        console.error("Error en addToCart:", e);
        res.status(500).json({ error: "Error al agregar al carrito" });
    }
};


export const removeFromCart = async (req, res) => {
    const { product_id } = req.body;

    if (!product_id) {
        return res.status(400).json({ error: "Falta product_id" });
    }

    try {
        const { column, value } = await getCartIdentity(req);

        const { rows } = await pool.query(
            `
            SELECT * FROM cart_items
            WHERE product_id = $1
            AND ${column} = $2
            LIMIT 1
            `,
            [product_id, value]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                error: "Producto no encontrado en el carrito",
            });
        }

        const item = rows[0];

        if (item.quantity > 1) {
            await pool.query(
                `
                UPDATE cart_items
                SET quantity = quantity - 1
                WHERE id = $1
                `,
                [item.id]
            );
        } else {
            await pool.query(
                `
                DELETE FROM cart_items
                WHERE id = $1
                `,
                [item.id]
            );
        }

        const { rows: updated } = await pool.query(
            `
            SELECT ci.*, p.name, p.price, p.stock, p.image_url, p.brand
            FROM cart_items ci
            JOIN products p ON ci.product_id = p.product_id
            WHERE ${column} = $1
            `,
            [value]
        );

        res.json({ cartItems: updated });
    } catch (e) {
        console.error("Error al reducir cantidad:", e);
        res.status(500).json({
            error: "Error al reducir cantidad del producto",
        });
    }
};

export const resetCart = async (req, res) => {
    try {
        const { column, value } = await getCartIdentity(req);

        await pool.query(
            `
            DELETE FROM cart_items
            WHERE ${column} = $1
            `,
            [value]
        );

        res.json({ message: "Carrito reseteado correctamente" });
    } catch (e) {
        console.error("Error al resetear el carrito:", e);
        res.status(500).json({
            error: "Error del servidor al resetear el carrito.",
        });
    }
};

export const buyProducts = async (req, res) => {
    const userId = req.user
        ? await getUserIdByUsername(req.user.username)
        : null;

    if (!userId) {
        return res.status(401).json({
            message: "Debes iniciar sesión para realizar una compra.",
        });
    }

    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const { rows: items } = await client.query(
            `
            SELECT ci.*, p.price
            FROM cart_items ci
            JOIN products p ON ci.product_id = p.product_id
            WHERE user_id = $1
            `,
            [userId]
        );

        if (!items.length) {
            await client.query("ROLLBACK");
            return res.status(400).json({
                message: "No hay productos en el carrito.",
            });
        }

        for (const item of items) {
            const { rows: [product] } = await client.query(
                `
                SELECT stock
                FROM products
                WHERE product_id = $1
                FOR UPDATE
                `,
                [item.product_id]
            );

            if (product.stock < item.quantity) {
                await client.query("ROLLBACK");
                return res.status(400).json({
                    message: `Stock insuficiente para el producto ${item.product_id}`,
                });
            }

            await client.query(
                `
                UPDATE products
                SET stock = stock - $1
                WHERE product_id = $2
                `,
                [item.quantity, item.product_id]
            );
        }

        const total = items.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        );

        const { rows: [order] } = await client.query(
            `
            INSERT INTO buy_orders (user_id, status, total)
            VALUES ($1, 'pendiente', $2)
            RETURNING order_id
            `,
            [userId, total]
        );

        for (const item of items) {
            await client.query(
                `
                INSERT INTO order_items (order_id, product_id, quantity, price)
                VALUES ($1, $2, $3, $4)
                `,
                [order.order_id, item.product_id, item.quantity, item.price]
            );
        }

        await client.query(
            `
            DELETE FROM cart_items
            WHERE user_id = $1
            `,
            [userId]
        );

        await client.query("COMMIT");

        res.json({ message: "Compra realizada exitosamente" });
    } catch (e) {
        await client.query("ROLLBACK");
        console.error("Error en buyProducts:", e);
        res.status(500).json({ message: "Error al procesar la compra" });
    } finally {
        client.release();
    }
};
