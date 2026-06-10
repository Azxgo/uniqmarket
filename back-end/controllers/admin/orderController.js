import pool from "../../db-config.js"

export const getAllOrders = async (req, res) => {
    try {
        const { rows } = await pool.query(`
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
        const { rows: orderRows } = await pool.query(`
            SELECT u.name, b.order_date, b.status, b.total
            FROM buy_orders b
            JOIN users u ON b.user_id = u.user_id
            WHERE b.order_id = $1
            `, [id])

        if (orderRows.length === 0) {
            return res.status(404).json({ message: "Orden no encontrada" });
        }

        const { rows: itemsRows } = await pool.query(`
            SELECT oi.product_id, p.image_url as product_image, p.name as product_name, oi.quantity, oi.price
            FROM order_items oi
            JOIN products p ON oi.product_id = p.product_id
            WHERE oi.order_id = $1
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
        const { rows: result } = await pool.query(`
            UPDATE buy_orders
            SET status = $1
            WHERE order_id = $2
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
        await pool.query(`DELETE FROM buy_orders WHERE order_id = $1`, [id])
        res.json({ "mensaje": "Usuario eliminado" })
    } catch {
        console.error(e)
        res.status(500).json({ "error": 'Error al eliminar Orden' })
    }
}