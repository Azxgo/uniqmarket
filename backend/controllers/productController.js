import pool from "../db-config.js";


export const getAll = async (req, res) => {
    try {
        const { rows } = await pool.query(`
        SELECT 
            p.product_id, 
            p.brand, 
            p.name, 
            p.stock, 
            p.description, 
            p.sku, 
            p.price,
            p.category_id, 
            p.image_url, 
            v.name AS vendor_name
        FROM products p
        LEFT JOIN vendors v ON p.vendor_id = v.vendor_id
        ORDER BY p.product_id ASC;`
        );
        res.json(rows)
    } catch (e) {
        res.status(500).json({ e: 'Error al obtener productos' });
    }
}

export const getCategories = async (req, res) => {
    try {
        const { rows } = await pool.query(
            `SELECT * from categories`
        );
        res.json(rows)
    } catch (e) {
        res.status(500).json({ e: 'Error al obtener categorias' });
    }
}

export const get5RandomProducts = async (req, res) => {
    try {
        const isMySQL = process.env.DB_ENGINE === "mysql";

        const sql = isMySQL
            ? `SELECT * FROM products ORDER BY RAND() LIMIT 4`
            : `SELECT * FROM products ORDER BY RANDOM() LIMIT 4`;

        const result = await pool.query(sql);

        // MySQL devuelve array, Postgres devuelve { rows }
        const rows = Array.isArray(result) ? result[0] : result.rows;

        res.json(rows);
    } catch (e) {
        console.error("❌ get5RandomProducts:", e);
        res.status(500).json({ e: "Error al obtener productos" });
    }
};