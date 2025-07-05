import pool from "../db-config.js";

export const addToCart = async (req, res) => {
    const { product_id, quantity = 1 } = req.body;
    if (!product_id) return res.status(400).json({ error: "Falta product_id" })

    const userId = req.user ? await getUserIdByUsername(req.user.username) : null
    const sessionId = req.cartSessionId;

    const [existingItems] = await pool.query(
        `SELECT * FROM cart_items WHERE product_id = ? 
        AND ${userId ? "user_id = ?" : "session_id = ?"}
        LIMIT 1`,
        [product_id, userId || sessionId]
    );

    if (existingItems.length > 0) {
        await pool.execute(
            `UPDATE cart_items SET quantity = quantity + ? WHERE id = ?`,
            [quantity, existingItems[0].id]
        )
    } else {
        await pool.execute(
            `INSERT INTO cart_items (user_id, session_id, product_id, quantity)
            VALUES (?, ?, ?, ?)`,
            [userId, sessionId, product_id, quantity]
        )
    }

    res.json({ success: true })
}

export const removeFromCart = async (req, res) => {
    const { product_id } = req.body
    if (!product_id) return res.status(400).json({ error: "Falta product_id" })

    const userId = req.user ? await getUserIdByUsername(req.user.username) : null
    const sessionId = req.cartSessionId;

    try {
        const [rows] = await pool.execute(
            `SELECT * FROM cart_items WHERE product_id = ? AND 
            ${userId ? 'user_id = ?' : "session_id = ?"} 
            LIMIT 1`,
            [product_id, userId || sessionId]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: "Producto no encontrado en el carrito" });
        }

        const item = rows[0]

        if (item.quantity > 1) {
            await pool.execute(
                `UPDATE cart_items SET quantity = quantity - 1 WHERE id = ?`,
                [item.id]
            )
        } else {
            await pool.execute(
                `DELETE FROM cart_items WHERE id = ?`,
                [item.id]
            )
        }
        res.json({ success: true, message: "Cantidad actualizada correctamente" });
    } catch (error) {
        console.error("Error al reducir cantidad:", error);
        res.status(500).json({ error: "Error al reducir cantidad del producto" });
    }
}

export const getCart = async (req, res) => {
    const userId = req.user ? await getUserIdByUsername(req.user.username) : null;
    const sessionId = req.cartSessionId

    const [items] = await pool.execute(
        `SELECT ci.*, p.name, p.price, p.image_url , p.brand  from cart_items ci
        JOIN products p ON ci.product_id = p.product_id
        WHERE ${userId ? "user_id = ?" : "session_id = ?"}`,
        [userId || sessionId]
    );

    res.json({ items })
}

export const resetCart = async (req, res) => {
    const userId = req.user ? await getUserIdByUsername(req.user.username) : null
    const sessionId = req.cartSessionId

    try {
        const [items] = await pool.execute(
            `SELECT * FROM cart_items
            WHERE ${userId ? "user_id = ?" : "session_id = ?"}`,
            [userId || sessionId]
        )

        if (items.length > 0) {
            await pool.execute(
                `DELETE FROM cart_items
                WHERE ${userId ? "user_id = ?" : "session_id = ?"}`,
                [userId || sessionId])

            return res.status(200).json({ message: "Carrito reseteado correctamente" });
        } else {
            return res.status(400).json({ error: "No hay productos en el carrito" });
        }
    } catch (error) {
        console.error("Error al resetear el carrito:", error);
        return res.status(500).json({ error: "Error del servidor al resetear el carrito." });
    }
}

export const buyProducts = async (req, res) => {
    const userId = req.user ? await getUserIdByUsername(req.user.username) : null;
    const sessionId = req.cartSessionId;

    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        const [items] = await connection.execute(
            `SELECT * FROM cart_items
             WHERE ${userId ? "user_id = ?" : "session_id = ?"}`,
            [userId || sessionId]
        );

        if (items.length === 0) {
            await connection.rollback();
            return res.status(400).json({ message: "No hay productos en el carrito." });
        }

        for (const item of items) {
            const [[product]] = await connection.execute(
                `SELECT stock FROM products WHERE product_id = ? FOR UPDATE`,
                [item.product_id]
            );

            if (!product) {
                await connection.rollback();
                return res.status(404).json({ message: `Producto con id ${item.product_id} no encontrado.` });
            }

            if (product.stock < item.quantity) {
                await connection.rollback();
                return res.status(400).json({ message: `Stock insuficiente para el producto ${item.product_id}.` });
            }

            await connection.execute(
                `UPDATE products SET stock = stock - ? WHERE product_id = ?`,
                [item.quantity, item.product_id]
            );
        }

        await connection.execute(
            `DELETE FROM cart_items WHERE ${userId ? "user_id = ?" : "session_id = ?"}`,
            [userId || sessionId]
        );

        await connection.commit();
        res.json({ message: "Compra realizada exitosamente" });
    } catch (error) {
        await connection.rollback();
        console.error("❌ Error en buyProducts:", error);
        res.status(500).json({ message: "Error al procesar la compra." });
    } finally {
        connection.release();
    }
};

const getUserIdByUsername = async (username) => {
    const [rows] = await pool.execute("SELECT user_id FROM users WHERE name = ?", [username])
    return rows.length > 0 ? rows[0].user_id : null
}