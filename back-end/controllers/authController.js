import pool from "../db-config.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
    const { username, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        const [existingUser] = await pool.execute(
            "SELECT * FROM users where name = ? or email = ?",
            [username, email]
        );

        if (existingUser.length > 0) {
            return res.status(400).json({ status: "Error", message: "El usuario o correo ya existen" });
        };

        await pool.execute(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            [username, email, hashedPassword]
        );

        return res.status(201).json({ status: "ok", message: "Usuario registrado correctamente" });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ status: "Error", message: "Error en el servidor" });
    }
}

export const login = async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    try {
        const [userData] = await pool.execute(
            "SELECT * FROM users WHERE name = ?",
            [username]
        )

        if (!userData || userData.length === 0) {
            return res.status(400).json({ status: "Error", message: "El usuario no existe" });
        }

        const match = await bcrypt.compare(password, userData[0].password);

        if (!match) {
            return res.status(400).json({ status: "Error", message: "Contraseña incorrecta" })
        }

        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1H" })

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 3600000
        })

        const sessionId = req.cookies?.cart_session_id ?? null;
        const userId = userData[0].user_id;

        if (sessionId !== null) {
            await pool.execute(
                `INSERT INTO cart_items (product_id, user_id, quantity)
                SELECT ci.product_id, ?, ci.quantity
                FROM cart_items ci
                WHERE ci.session_id = ? AND ci.user_id IS NULL
                ON DUPLICATE KEY UPDATE quantity = cart_items.quantity + VALUES(quantity)`,
                [userId, sessionId]
            );

            await pool.execute(
                "DELETE FROM cart_items WHERE session_id = ? AND user_id IS NULL",
                [sessionId]
            );
        }

        return res.status(200).json({
            status: "ok",
            message: "Inicio de sesión exitoso",
            user: userData[0].name
        });
    } catch (e) {
        console.error('Error en el login:', e.message);
        return res.status(500).json({ status: "Error", message: "Error en el servidor" });
    }
}

export const logout = async (req, res) => {
    const sessionId = req.cookies.cart_session_id;

    if (sessionId) {
        await pool.execute("DELETE FROM cart_items WHERE session_id = ?", [sessionId]);
        res.clearCookie("cart_session_id");
    }

    res.clearCookie("token");
    res.json("Sesión cerrada");
}

export const verify = async (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.json({ authenticated: false });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const [userRows] = await pool.execute(
            "SELECT role FROM users WHERE name = ?",
            [decoded.username]
        );

        if (userRows.length === 0) return res.json({ authenticated: false });

        res.json({
            authenticated: true,
            username: decoded.username,
            role: userRows[0].role
        });

    } catch (err) {
        console.error(err);
        res.json({ authenticated: false });
    }
};