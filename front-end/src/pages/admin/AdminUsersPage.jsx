import { useEffect, useState } from "react"
import { useAdminTitle } from "../../context/admin/AdminTitleContext"
import { useNavigate, useParams } from "react-router-dom"

export default function AdminUsersPage() {
    const { setTitle } = useAdminTitle()

    const { id } = useParams()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: ""
    });

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:3000/admin/users/get/${id}`)
                .then(res => res.json())
                .then(data => {
                    setFormData({
                        name: data.name || "",
                        email: data.email || "",
                        password: "",
                        role: data.role || ""
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

        const endpoint = id
            ? `http://localhost:3000/admin/users/update/${id}`
            : "http://localhost:3000/admin/users/create"

        const method = id ? "PUT" : "POST"

        const res = await fetch(endpoint, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        });

        const data = await res.json()
        console.log(data)

        if (res.ok) {
            navigate("/admin/users")
        }
    }

    useEffect(() => {
        setTitle("Usuarios");
    }, []);

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
                            <label htmlFor="email" className="block font-medium text-gray-700">Correo</label>
                            <input id="email" type="text" value={formData.email} onChange={handleChange} className="w-full border rounded-md px-3 py-2" />
                        </div>
                        <div className="space-y-1">
                            <label htmlFor="password" className="block font-medium text-gray-700">Contraseña</label>
                            <input id="password" type="text" value={formData.password} onChange={handleChange} className="w-full border rounded-md px-3 py-2" />
                        </div>
                        <div className="space-y-1">
                            <label htmlFor="role" className="block font-medium text-gray-700">Rol</label>
                            <select
                                id="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2 appearance-none"
                            >
                                <option value="">-- Selecciona un rol --</option>
                                <option value="admin">Admin</option>
                                <option value="customer">Customer</option>
                            </select>
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