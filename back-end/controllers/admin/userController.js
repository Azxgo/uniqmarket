import pool from "../../db-config.js"
import bcrypt from "bcrypt"

export const getAllUsers = async (req, res) => {
    try {
        const [rows] = await pool.execute(`
            SELECT user_id, name, email, role, created_at
            FROM users
            `)
        res.json(rows)
    } catch (e) {
        res.status(500).json({ e: 'Error al obtener usuarios' });
    }
}

export const getUserById = async (req, res) => {
    const { id } = req.params
    try {
        const [rows] = await pool.execute(`
            SELECT * FROM users WHERE user_id = ?
            `, [id])

        if (rows.length === 0) return res.status(404).json({ "error": "Usuario no encontrado" })
        res.json(rows[0])
    } catch (e) {
        console.error(e)
        res.status(500).json({ "error": "Error al obtener producto" })
    }
}

export const createUser = async (req, res) => {
    const { name, email, password, role } = req.body
    try {
        const hashed = await bcrypt.hash(password, 10)
        const [result] = await pool.execute(`
            INSERT INTO users (name, email, password, role)
            VALUES (?, ?, ?, ?)
            `, [name, email, hashed, role])

        res.status(201).json({ message: "Usuario creado", user_id: result.insertId });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Error al crear Usuario' });
    }
}
export const updateUser = async (req, res) => {
    const { id } = req.params
    const { name, email, password, role } = req.body
    try {
        if (password) {
            const hashed = await bcrypt.hash(password, 10)
            await pool.execute(`
            UPDATE users
            SET name = ?, email = ?, password = ?, role = ?
            WHERE user_id = ?
            `, [name, email, hashed, role, id])
        } else {
            await pool.execute(`
            UPDATE users
            SET name = ?, email = ?, role = ?
            WHERE user_id = ?
            `, [name, email, role, id])
        }
        res.json({ "mensaje": "Usuario Actualizado" })
    } catch (e) {
        console.error(e)
        res.status(500).json({ "error": 'Error al actualizar Usuario' })
    }
}

export const deleteUser = async (req, res) => {
    const { id } = req.params
    try {
        await pool.execute(`
            DELETE FROM users
            WHERE user_id = ?
            ` , [id])
        res.json({ "mensaje": "Usuario eliminado" })
    } catch (e) {
        console.error(e)
        res.status(500).json({ "error": 'Error al eliminar Usuario' })
    }
}
