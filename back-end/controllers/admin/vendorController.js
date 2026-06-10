import pool from "../../db-config.js"

export const getAllVendors = async (req, res) => {
    try {
        const { rows } = await pool.query(`
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
        const { rows: vendorRows } = await pool.query(`
            SELECT * FROM vendors
            WHERE vendor_id = $1
            `, [id])

        if (vendorRows.length === 0) {
            return res.status(404).json({ message: "Vendedor no encontredo" });
        }

        const { rows: itemsRows } = await pool.query(`
            SELECT product_id, name, image_url, vendor_id
            FROM products
            WHERE vendor_id = $1
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
        const { rows: result } = await pool.query(`
            INSERT INTO vendors (name) VALUES ($1)    
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
        const { rows: result } = await pool.query(`
            UPDATE vendors SET name = $1 
            WHERE vendor_id = $2
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
        const { rows: products } = await pool.query(
            `SELECT COUNT(*) AS count FROM products WHERE vendor_id = $1`, [id])

        if (products[0].count > 0) {
            return res.status(400).json({ error: "No se puede eliminar: el vendedor tiene productos." });
        }

        await pool.query(
            `DELETE FROM vendors WHERE vendor_id = $1`, [id])
        res.json({ mensaje: "Vendedor eliminado" })
    } catch (e) {
        console.error(e)
        res.status(500).json({ "error": 'Error al eliminar vendedor' })
    }
}