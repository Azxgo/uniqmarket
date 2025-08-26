import pool from "../db-config.js";
import { getUserIdByUsername } from "../utils/getUserIdByUsername.js";

export const addRating = async (req, res) => {
    const { product_id, rating } = req.body;
    if (!req.user) {
        return res.status(401).json({ error: "Debes iniciar sesión para puntuar" });
    }

    const user_id = await getUserIdByUsername(req.user.username);

    try {
        const [items] = await pool.query(
            `INSERT INTO products_ratings (user_id, product_id, rating)
             VALUES (?, ?, ?)`,
            [user_id, product_id, rating]
        );

        res.status(201).json({ message: "Puntuación guardada", rating_id: items.insertId });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Error al guardar la puntuación' });
    }
};

export const getProductRating = async (req, res) => {
    const { id } = req.params

    try {
        const [rows] = await pool.query(
            `SELECT AVG(rating) as avg_rating, COUNT(*) as total_reviews FROM products_ratings WHERE product_id = ?`,
            [id]
        );

        const avg_rating = rows[0].avg_rating !== null
            ? parseFloat(Number(rows[0].avg_rating).toFixed(1))
            : 0;
        const total_reviews = rows[0].total_reviews || 0

        res.json({ avg_rating, total_reviews })
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Error al obtener el promedio" });
    }
}

export const getUserRating = async (req, res) => {
    const { id } = req.params

    if (!req.user) {
        return res.status(401).json({ error: "Debes iniciar sesión para puntuar" });
    }

    const user_id = await getUserIdByUsername(req.user.username);

    try {
        const [rows] = await pool.query(
            `SELECT rating
            FROM products_ratings
            WHERE product_id = ?
            AND user_id = ?`,
            [id, user_id]
        )

        const userRating = rows[0] ? rows[0].rating : null
        res.json({ rating: userRating })
    } catch {
        console.error(e);
        res.status(500).json({ error: "Error al obtener la puntuación" });
    }
}