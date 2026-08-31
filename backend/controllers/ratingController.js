import pool from "../db-config.js";
import { getUserIdByUsername } from "../utils/getUserIdByUsername.js";
import { hasPurchased } from "../utils/hasPurchased.js";

export const addRating = async (req, res) => {
    const { product_id, rating, title, review } = req.body;
    if (!req.user) {
        return res.status(401).json({ error: "Debes iniciar sesión para puntuar" });
    }

    const user_id = await getUserIdByUsername(req.user.username);

    if (!(await hasPurchased(user_id, product_id))) {
        return res.status(403).json({ error: "Solo puedes reseñar productos que has comprado" });
    }

    try {
        const { rows: items } = await pool.query(
            `INSERT INTO products_ratings (user_id, product_id, rating, title, review)
             VALUES ($1, $2, $3, $4, $5)
             ON CONFLICT (user_id, product_id)
            DO UPDATE SET
                rating = EXCLUDED.rating,
                review = EXCLUDED.review
            RETURNING rating_id`,
            [user_id, product_id, rating, title, review]
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
        const { rows } = await pool.query(
            `SELECT AVG(rating) as avg_rating, COUNT(*) as total_reviews FROM products_ratings WHERE product_id = $1`,
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
        const { rows } = await pool.query(
            `SELECT rating, title, review
            FROM products_ratings
            WHERE product_id = $1
            AND user_id = $2`,
            [id, user_id]
        )

        const userRating = rows[0] ? rows[0].rating : null
        const title = rows[0] ? rows[0].title : null
        const review = rows[0] ? rows[0].review : null
        res.json({ rating: userRating, review: review, title: title })
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
        const { rows: result } = await pool.query(`
            SELECT COUNT(*) AS total_reviews FROM products_ratings
            `)

        const total_reviews = result[0].total_reviews || 0
        res.json({ total_reviews })
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Error al obtener el total de reseñas" });
    }
}

export const getReviewsbyProduct = async (req, res) => {
    const { id } = req.params

    try {
        const { rows } = await pool.query(`
            SELECT pr.user_id, us.name, pr.rating, pr.title, pr.review, pr.created_at as review_date, MIN(bo.order_date) AS first_purchase_date
            FROM products_ratings pr
            JOIN users us
            ON us.user_id = pr.user_id
            JOIN order_items oi
            ON oi.product_id = pr.product_id
            JOIN buy_orders bo
            ON bo.order_id = oi.order_id
            AND bo.user_id = pr.user_id
            WHERE pr.product_id = $1
            GROUP BY pr.user_id, us.name, pr.title,  pr.rating, pr.review, pr.created_at;
            `, [id])

        res.json(rows)
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Error al obtener las reseñas" });
    }
}

export const deleteReview = async (req, res) => {
    const { productId } = req.params;
    const user_id = await getUserIdByUsername(req.user.username);

    try {
        const result = await pool.query(`
            DELETE FROM products_ratings
            WHERE product_id = $1 AND user_id = $2
           ;
        `, [productId, user_id]);

        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "No se encontró la reseña para eliminar"
            });
        }

        res.json({
            message: "Reseña eliminada correctamente"
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            error: "Error al eliminar la reseña"
        });
    }
};