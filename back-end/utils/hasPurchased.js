import pool from "../db-config.js";

export const hasPurchased = async (user_id, product_id) => {
    const [rows] = await pool.query(
        `SELECT 1 FROM order_items oi
         JOIN buy_orders o ON oi.order_id = o.order_id
         WHERE o.user_id = ? AND oi.product_id = ? LIMIT 1`,
        [user_id, product_id]
    );
    return rows.length > 0;
};