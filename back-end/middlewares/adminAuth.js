import jwt from "jsonwebtoken";
import pool from "../db-config.js";

export const adminAuth = async (req, res, next) => {
    const token = req.cookies.token
    if (!token) return res.status(401).json({ message: "No autorizado" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const username = decoded.username

        const [userRows] = await pool.execute(
            `SELECT user_id, name, role FROM users WHERE name = ?`,
            [username]
        )

        if (userRows.length === 0) {
            return res.status(401).json({ message: "Usuario no encontrado" });
        }

        const user = userRows[0]

        if (user.role !== "admin") {
            return res.status(403).json({ message: "Acceso denegado" });
        }

        req.user = { id: user.user_id, name: user.name, role: user.role };

        next()
    } catch (e) {
        console.error(e)
        return res.status(401).json({ message: "Token inválido" });
    }
}
