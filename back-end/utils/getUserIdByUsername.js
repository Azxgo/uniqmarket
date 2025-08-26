import pool from "../db-config.js";

export const getUserIdByUsername = async (username) => {
    const [rows] = await pool.execute("SELECT user_id FROM users WHERE name = ?", [username])
    return rows.length > 0 ? rows[0].user_id : null
}