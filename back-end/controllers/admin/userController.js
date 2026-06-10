import pool from "../../db-config.js"
import bcrypt from "bcrypt"

export const getAllUsers = async (req, res) => {
    try {
        const { rows } = await pool.query(`
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
        const { rows } = await pool.query(`
            SELECT * FROM users WHERE user_id = $1
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
        const { rows: result } = await pool.query(`
            INSERT INTO users (name, email, password, role)
            VALUES ($1, $2, $3, $4)
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
            await pool.query(`
            UPDATE users
            SET name = $1, email = $2, password = $3, role = $4
            WHERE user_id = $5
            `, [name, email, hashed, role, id])
        } else {
            await pool.query(`
            UPDATE users
            SET name = $1, email = $2, role = $3
            WHERE user_id = $4
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
        await pool.query(`
            DELETE FROM users
            WHERE user_id = $1
            ` , [id])
        res.json({ "mensaje": "Usuario eliminado" })
    } catch (e) {
        console.error(e)
        res.status(500).json({ "error": 'Error al eliminar Usuario' })
    }
}
