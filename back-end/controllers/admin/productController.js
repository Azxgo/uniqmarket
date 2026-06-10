import pool from "../../db-config.js"

export const getAllProducts = async (req, res) => {
    try {
        const { rows } = await pool.query(`
        SELECT p.product_id, p.name, p.price, p.stock, p.image_url,
        pr.avg_rating,
        c.name AS category_name,
        v.name AS vendor_name
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.category_id
        LEFT JOIN vendors v ON p.vendor_id = v.vendor_id
        LEFT JOIN (
            SELECT product_id, ROUND(AVG(rating)::numeric, 1) AS avg_rating
            FROM products_ratings
            GROUP BY product_id
        ) pr ON p.product_id = pr.product_id;
            `)
        res.json(rows)
    } catch (e) {
        res.status(500).json({ e: 'Error al obtener productos' });
    }
}

export const getProductById = async (req, res) => {
    const { id } = req.params
    try {
        const { rows } = await pool.query(`
            SELECT * FROM products WHERE product_id = $1
            `, [id])

        if (rows.length === 0) return res.status(404).json({ "error": "Producto no encontrado" })
        res.json(rows[0])
    } catch (e) {
        console.error(e)
        res.status(500).json({ "error": "Error al obtener producto" })
    }
}

export const createProduct = async (req, res) => {
    const { name, brand, price, stock, sku, description, category, vendor, image_url } = req.body
    try {
        const { rows: result } = await pool.query(`
            INSERT INTO products (name, brand, price, stock, sku, description, category_id , vendor_id, image_url)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            `, [name, brand, price, stock, sku, description, category, vendor, image_url])

        res.status(201).json({ message: "Producto creado", product_id: result.insertId });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Error al crear producto' });
    }
}
export const updateProduct = async (req, res) => {
    const { id } = req.params
    const { name, brand, price, stock, sku, description, category, vendor, image_url } = req.body
    try {
        await pool.query(`
            UPDATE products
            SET name = $1, brand = $2, price = $3, stock = $4, sku = $5, description = $6, category_id = $7, vendor_id = $8, image_url = $9
            WHERE product_id = $10
            `, [name, brand, price, stock, sku, description, category, vendor, image_url, id])
        res.json({ "mensaje": "Producto Actualizado" })
    } catch (e) {
        console.error(e)
        res.status(500).json({ "error": 'Error al actualizar producto' })
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params
    try {
        await pool.query(`
            DELETE FROM products
            WHERE product_id = $1
            ` , [id])
        res.json({ "mensaje": "Producto eliminado" })
    } catch (e) {
        console.error(e)
        res.status(500).json({ "error": 'Error al eliminar producto' })
    }
}

export const top5Products = async (req, res) => {
    try {
        const { rows } = await pool.query(
            `SELECT p.name, p.brand, p.image_url, ROUND(AVG(pr.rating), 1) AS avg_rating, COUNT(pr.rating) AS total_reviews, (AVG(pr.rating) * LN(1 + COUNT(pr.rating))) AS score
            FROM products_ratings pr
            JOIN products p ON pr.product_id = p.product_id
            GROUP BY pr.product_id, p.name, p.brand, p.image_url
            ORDER BY score DESC
            LIMIT 5;`
        )

        res.json(rows)
    } catch (e) {
        res.status(500).json({ e: "Error al obtener productos" })
    }
}

