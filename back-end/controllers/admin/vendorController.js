import pool from "../../db-config.js"

export const getAllVendors = async (req, res) => {
    try {
        const [rows] = await pool.execute(`
            SELECT v.vendor_id, v.name, COUNT(p.product_id) AS total_products
            FROM vendors v
            LEFT JOIN products p ON v.vendor_id = p.vendor_id
            GROUP BY v.vendor_id , v.name
            ORDER BY v.vendor_id ASC
            `)
        res.json(rows)
    } catch (e) {
        res.status(500).json({ e: 'Error al obtener ordenes' });
    }
}

export const getVendorById = async (req, res) => {
    const { id } = req.params
    try {
        const [vendorRows] = await pool.execute(`
            SELECT * FROM vendors
            WHERE vendor_id = ?
            `, [id])

        if (vendorRows.length === 0) {
            return res.status(404).json({ message: "Vendedor no encontredo" });
        }

        const [itemsRows] = await pool.execute(`
            SELECT product_id, name, image_url, vendor_id
            FROM products
            WHERE vendor_id = ?
            `, [id])

        const vendors = {
            ...vendorRows[0],
            items: itemsRows
        }

        res.json(vendors)
    } catch (e) {
        res.status(500).json({ message: "Error al obtener el vendedor" });
    }
}

export const createVendor = async (req, res) => {
    const { name } = req.body
    try {
        const result = await pool.execute(`
            INSERT INTO vendors (name) VALUES (?)    
            `, [name])

        res.status(201).json({ message: "Vendedor creado", vendor_id: result.insertId });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Error al crear vendedor' });
    }
}

export const updateVendor = async (req, res) => {
    const { id } = req.params
    const { name } = req.body
    try {
        const [result] = await pool.execute(`
            UPDATE vendors SET name = ? 
            WHERE vendor_id = ?
            `, [name, id])

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Vendedor no encontrado" });
        }

        res.json({ message: 'Vendedor actualizado correctamente' });
    } catch (e) {
        console.error(e)
        res.status(500).json({ "error": 'Error al actualizar vendedor' })
    }
}

export const deleteVendor = async (req, res) => {
    const { id } = req.params
    try {
        const [products] = await pool.execute(
            `SELECT COUNT(*) AS count FROM products WHERE vendor_id = ?`, [id])

        if (products[0].count > 0) {
            return res.status(400).json({ error: "No se puede eliminar: el vendedor tiene productos." });
        }

        await pool.execute(
            `DELETE FROM vendors WHERE vendor_id = ?`, [id])
        res.json({ mensaje: "Vendedor eliminado" })
    } catch (e) {
        console.error(e)
        res.status(500).json({ "error": 'Error al eliminar vendedor' })
    }
}