import pool from "../../db-config.js"

export const getAllProducts = async (req, res) => {
    try {
        const [rows] = await pool.execute(`
            SELECT p.product_id, p.name, p.price, p.stock, p.image_url,
            c.name AS category_name, v.name AS vendor_name
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.category_id
            LEFT JOIN vendors v ON p.vendor_id = v.vendor_id
            `)
        res.json(rows)
    } catch (e) {
        res.status(500).json({ e: 'Error al obtener productos' });
    }
}

export const getProductById = async (req, res) => {
    const { id } = req.params
    try {
        const [rows] = await pool.execute(`
            SELECT * FROM products WHERE product_id = ?
            `, [id])

        if (rows.length === 0) return res.status(404).json({ "error": "Producto no encontrado" })
        res.json(rows[0])
    } catch (e) {
        console.error(e)
        res.status(500).json({ "error": "Error al obtener producto" })
    }
}

export const createProduct = async (req, res) => {
    const { name, brand, price, stock, sku, description, category, vendor, image_url } = req.body
    try {
        const [result] = await pool.execute(`
            INSERT INTO products (name, brand, price, stock, sku, description, category_id , vendor_id, image_url)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `, [name, brand, price, stock, sku, description, category, vendor, image_url])

        res.status(201).json({ message: "Producto creado", product_id: result.insertId });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Error al crear producto' });
    }
}
export const updateProduct = async (req, res) => {
    const { id } = req.params
    const { name, brand, price, stock, sku, description, category, vendor, image_url } = req.body
    try {
        await pool.execute(`
            UPDATE products
            SET name = ?, brand = ?, price = ?, stock = ?, sku = ?, description = ?, category_id = ?, vendor_id = ?, image_url = ?
            WHERE product_id = ?
            `, [name, brand, price, stock, sku, description, category, vendor, image_url, id])
        res.json({ "mensaje": "Producto Actualizado" })
    } catch (e) {
        console.error(e)
        res.status(500).json({ "error": 'Error al actualizar producto' })
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params
    try {
        await pool.execute(`
            DELETE FROM products
            WHERE product_id = ?
            ` , [id])
        res.json({ "mensaje": "Producto eliminado" })
    } catch (e) {
        console.error(e)
        res.status(500).json({ "error": 'Error al eliminar producto' })
    }
}

