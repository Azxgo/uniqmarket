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
    } catch (err) {
        console.error(err);
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
            const [items] = await pool.execute(
                "SELECT product_id, quantity FROM cart_items WHERE session_id = ?",
                [sessionId]
            );

            for (const item of items) {
                const [existing] = await pool.execute(
                    "SELECT id FROM cart_items WHERE user_id = ? AND product_id = ?",
                    [userId, item.product_id]
                );

                if (existing.length > 0) {
                    await pool.execute(
                        "UPDATE cart_items SET quantity = quantity + ? WHERE id = ?",
                        [item.quantity, existing[0].id]
                    );
                } else {
                    await pool.execute(
                        "INSERT INTO cart_items (user_id, session_id, product_id, quantity) VALUES (?, ?, ?, ?)",
                        [userId, null, item.product_id, item.quantity]
                    );
                }
            }

            await pool.execute(
                "DELETE FROM cart_items WHERE session_id = ?",
                [sessionId]
            );

            res.clearCookie("cart_session_id");
        }

        return res.status(200).json({
            status: "ok",
            message: "Inicio de sesión exitoso",
            user: userData[0].name
        });
    } catch (err) {
        console.error('Error en el login:', err.message);
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

export const verify = (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        // Respondemos 200 con authenticated: false en lugar de 401
        return res.json({ authenticated: false });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            // Igual respondemos 200 con authenticated: false
            return res.json({ authenticated: false });
        }
        // Usuario autenticado: enviamos username y authenticated true
        res.json({ authenticated: true, username: decoded.username });
    });
};