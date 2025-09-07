
import { useEffect } from "react";
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAdminTitle } from "../../context/admin/AdminTitleContext";
import { useCategories } from "../../hooks/admin/useCategories";
import { useVendors } from "../../hooks/admin/useVendors";

export default function AdminProductPage() {
    const { setTitle } = useAdminTitle()
    const { id } = useParams()
    const { categories } = useCategories()
    const { vendors } = useVendors()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: "",
        brand: "",
        price: "",
        stock: "",
        sku: "",
        description: "",
        category: "",
        vendor: "",
        image_url: ""
    });

    useEffect(() => {
        if (id) {
            setTitle("Editar Producto")
            fetch(`http://localhost:3000/admin/products/get/${id}`, {
                credentials: "include"
            })
                .then(res => res.json())
                .then(data => {
                    setFormData({
                        name: data.name || "",
                        brand: data.brand || "",
                        price: data.price || "",
                        stock: data.stock || "",
                        sku: data.sku || "",
                        description: data.description || "",
                        category: data.category_id || "",
                        vendor: data.vendor_id || "",
                        image_url: data.image_url || ""
                    })
                })
        } else {
            setTitle("Crear Producto")
        }
    }, [id])

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const parsedFormData = {
            ...formData,
            price: parseFloat(formData.price),
            stock: parseInt(formData.stock),
            category: parseInt(formData.category),
            vendor: parseInt(formData.vendor),
        };

        const endpoint = id
            ? `http://localhost:3000/admin/products/update/${id}`
            : "http://localhost:3000/admin/products/create"

        const method = id ? "PUT" : "POST"

        const res = await fetch(endpoint, {
            method,
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(parsedFormData)
        });

        if (!res.ok) throw new Error("Error al guardar el producto");
        alert(id ? "Producto actualizado correctamente" : "Producto creado correctamente");

        if (res.ok) {
            navigate("/admin/products")
        }
    }

    return (
        <div className="flex flex-col h-full w-full gap-6">
            <div className="">
                <form className="flex flex-col rounded bg-white p-4 gap-5" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <label htmlFor="name" className="block font-medium text-gray-700">Nombre</label>
                            <input id="name" type="text" value={formData.name} onChange={handleChange} className="w-full border rounded-md px-3 py-2" />
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="brand" className="block font-medium text-gray-700">Marca</label>
                            <input id="brand" type="text" value={formData.brand} onChange={handleChange} className="w-full border rounded-md px-3 py-2" />
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="sku" className="block font-medium text-gray-700">SKU</label>
                            <input id="sku" type="text" value={formData.sku} onChange={handleChange} className="w-full border rounded-md px-3 py-2" />
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="price" className="block font-medium text-gray-700">Precio</label>
                            <input id="price" type="number" value={formData.price} onChange={handleChange} className="w-full border rounded-md px-3 py-2" />
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="stock" className="block font-medium text-gray-700">Stock</label>
                            <input id="stock" type="number" value={formData.stock} onChange={handleChange} className="w-full border rounded-md px-3 py-2" />
                        </div>

                        <div className="md:col-span-2 space-y-1">
                            <label htmlFor="description" className="block font-medium text-gray-700">Descripción</label>
                            <textarea
                                onChange={handleChange}
                                value={formData.description}
                                id="description"
                                className="w-full border rounded-md px-3 py-2 min-h-[120px] resize-y"
                                placeholder="Agrega una descripción detallada del producto"
                            />
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="category" className="block font-medium text-gray-700">Categoría</label>
                            <select
                                id="category"
                                className="w-full border rounded-md px-3 py-2 appearance-none"
                                value={formData?.category || ""}
                                onChange={handleChange}
                            >
                                {categories.map((cat) => (
                                    <option key={cat.category_id} value={cat.category_id}>{cat.category_name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="vendor" className="block font-medium text-gray-700">Vendedor</label>
                            <select
                                id="vendor"
                                className="w-full border rounded-md px-3 py-2 appearance-none"
                                value={formData.vendor}
                                onChange={handleChange}
                            >
                                {vendors.map((ven) => (
                                    <option key={ven.vendor_id} value={ven.vendor_id}>{ven.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="image_url" className="block font-medium text-gray-700">Imagen</label>
                            <input id="image_url" type="text" value={formData.image_url} onChange={handleChange} className="w-full border rounded-md px-3 py-2" />
                        </div>

                        <div className="space-y-1">
                            <button className="p-2 bg-zinc-800 rounded-md text-white">
                                {id ? "Actualizar" : "Crear"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
} 