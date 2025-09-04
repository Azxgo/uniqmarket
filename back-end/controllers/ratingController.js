import pool from "../db-config.js";
import { getUserIdByUsername } from "../utils/getUserIdByUsername.js";
import { hasPurchased } from "../utils/hasPurchased.js";

export const addRating = async (req, res) => {
    const { product_id, rating, review } = req.body;
    if (!req.user) {
        return res.status(401).json({ error: "Debes iniciar sesión para puntuar" });
    }

    const user_id = await getUserIdByUsername(req.user.username);

    if (!(await hasPurchased(user_id, product_id))) {
        return res.status(403).json({ error: "Solo puedes reseñar productos que has comprado" });
    }

    try {
        const [items] = await pool.query(
            `INSERT INTO products_ratings (user_id, product_id, rating, review)
             VALUES (?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE rating = VALUES(rating), review = VALUES(review)`,
            [user_id, product_id, rating, review]
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
            `SELECT rating, review
            FROM products_ratings
            WHERE product_id = ?
            AND user_id = ?`,
            [id, user_id]
        )

        const userRating = rows[0] ? rows[0].rating : null
        const review = rows[0] ? rows[0].review : null
        res.json({ rating: userRating, review: review })
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Error al obtener la puntuación" });
    }
}

export const checkPurcharse = async (req, res) => {
    if (!req.user) return res.status(401).json({ purchased: false })

    const { id } = req.params
    const user_id = await getUserIdByUsername(req.user.username);

    try {
        const purchased = await hasPurchased(user_id, id);
        res.json({ purchased });
    } catch (e) {
        console.error(e);
        res.status(500).json({ purchased: false });
    }
}

export const getAllRatings = async (req, res) => {
    try {
        const [result] = await pool.execute(`
            SELECT COUNT(*) AS total_reviews FROM products_ratings
            `)

        const total_reviews = result[0].total_reviews || 0
        res.json({ total_reviews })
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Error al obtener el total de reseñas" });
    }
}