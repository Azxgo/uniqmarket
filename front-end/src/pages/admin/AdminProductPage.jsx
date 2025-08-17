import { useEffect } from "react";
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export default function AdminProductPage() {
    //Investigar sobre zustand
    const { id } = useParams()
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
            fetch(`http://localhost:3000/admin/get/${id}`)
                .then(res => res.json())
                .then(data => {
                    setFormData({
                        name: data.name || "",
                        brand: data.brand || "",
                        price: data.price || "",
                        stock: data.stock || "",
                        sku: data.sku || "",
                        description: data.description ||  "",
                        category: data.category_id ||  "",
                        vendor: data.vendor_id || "",
                        image_url: data.image_url || ""
                    })
                })
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
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(parsedFormData)
        });

        const data = await res.json()
        console.log(data)

        if (res.ok) {
            navigate("/admin")
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
                            <input id="category" type="text" value={formData.category} onChange={handleChange} className="w-full border rounded-md px-3 py-2" />
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="vendor" className="block font-medium text-gray-700">Vendedor</label>
                            <input id="vendor" type="text" value={formData.vendor} onChange={handleChange} className="w-full border rounded-md px-3 py-2" />
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