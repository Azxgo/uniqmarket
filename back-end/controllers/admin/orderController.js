import pool from "../../db-config.js"

export const getAllOrders = async (req, res) => {
    try {
        const [rows] = await pool.execute(`
            SELECT b.order_id, u.name, b.order_date, b.status, b.total
            FROM buy_orders b
            JOIN users u ON b.user_id = u.user_id
            `)
        res.json(rows)
    } catch (e) {
        res.status(500).json({ e: 'Error al obtener ordenes' });
    }
}

export const getById = async (req, res) => {
    const { id } = req.params
    try {
        const [orderRows] = await pool.execute(`
            SELECT u.name, b.order_date, b.status, b.total
            FROM buy_orders b
            JOIN users u ON b.user_id = u.user_id
            WHERE b.order_id = ?
            `, [id])

        if (orderRows.length === 0) {
            return res.status(404).json({ message: "Orden no encontrada" });
        }

        const [itemsRows] = await pool.execute(`
            SELECT oi.product_id, p.image_url as product_image, p.name as product_name, oi.quantity, oi.price
            FROM order_items oi
            JOIN products p ON oi.product_id = p.product_id
            WHERE oi.order_id = ?
            `, [id])

        const order = {
            ...orderRows[0],
            items: itemsRows
        }

        res.json(order)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener la orden" });
    }
}

export const updateStatus = async (req, res) => {
    const { id } = req.params
    const { status } = req.body
    try {
        const [result] = await pool.execute(`
            UPDATE buy_orders
            SET status = ?
            WHERE order_id = ?
            `, [status, id])

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Orden no encontrada" });
        }
        res.json({ "mensaje": "Orden Actualizada" })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar el estado" });
    }
}

export const deleteOrder = async (req, res) => {
    const { id } = req.params

    try {
        await pool.execute(`DELETE FROM buy_orders WHERE order_id = ?`, [id])
        res.json({ "mensaje": "Usuario eliminado" })
    } catch {
        console.error(e)
        res.status(500).json({ "error": 'Error al eliminar Orden' })
    }
}