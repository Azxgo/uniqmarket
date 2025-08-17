import pool from "../db-config.js";

export const getAll = async (req, res) => {
    try {
        const [rows] = await pool.execute(`
            SELECT p.product_id, p.brand, p.name, p.description, p.sku, p.price,
            p.category_id, p.image_url, v.name AS vendor_name
            FROM products p
            LEFT JOIN vendors v ON p.vendor_id = v.vendor_id`);
        res.json(rows)
    } catch (e) {
        res.status(500).json({ e: 'Error al obtener productos' });
    }
}

export const getCategories = async (req, res) => {
    try {
        const [rows] = await pool.execute(
            `SELECT * from categories`
        );
        res.json(rows)
    } catch (e) {
        res.status(500).json({ e: 'Error al obtener categorias' });
    }
}

export const get5RandomProducts = async (req, res) => {
    try {
        const [rows] = await pool.execute(
            `SELECT * FROM products ORDER BY RAND() LIMIT 5`
        );
        res.json(rows)
    } catch (e) {
        res.status(500).json({ e: "Error al obtener productos" })
    }
}