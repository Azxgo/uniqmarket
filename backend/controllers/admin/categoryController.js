import pool from "../../db-config.js"

export const getAllCategories = async (req, res) => {
    try {
        const { rows } = await pool.query(`
            SELECT c.category_id, c.name AS category_name, COUNT(p.product_id) AS product_count
            FROM categories c
            LEFT JOIN products p ON c.category_id = p.category_id
            GROUP BY c.category_id, c.name
            ORDER BY c.name
            `)

        res.json(rows)
    } catch (e) {
        res.status(500).json({ e: 'Error al obtener ordenes' });
    }
}

export const updateCategory = async (req, res) => {
    const { id } = req.params
    const { name } = req.body
    try {
        await pool.query(`
            UPDATE categories SET name = $1 WHERE category_id = $2    
            `, [name, id])
        res.json({ success: true });
    } catch (e) {
        res.status(500).json({ error: "Error al actualizar categoría" });
    }
}

export const addCategory = async (req, res) => {
    const { name } = req.body;
    try {
        const { rows: result } = await pool.query(
            `INSERT INTO categories (name) VALUES ($1)`,
            [name]
        );
        res.status(201).json({ message: "Categoría creada", category_id: result.insertId });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Error al crear categoría" });
    }
};

export const deleteCategory = async (req, res) => {
    const { id } = req.params
    try {
        const { rows: products } = await pool.query(
            `SELECT COUNT (*) AS count FROM products WHERE category_id = $1`, [id])

        if (products[0].count > 0) {
            return res.status(400).json({ error: "No se puede eliminar: la categoría tiene productos." });
        }

        await pool.query(
            `DELETE FROM categories WHERE category_id = $1`, [id])
        res.json({ mensaje: "Categoría eliminada" })
    } catch (e) {
        console.error(e)
        res.status(500).json({ "error": 'Error al eliminar categoría' })
    }
}