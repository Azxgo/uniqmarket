import { useEffect, useState } from "react";
import { useAdminTitle } from "../../context/admin/AdminTitleContext";
import { useNavigate, useParams } from "react-router-dom";
import { VendorIcon } from "../../icons/AdminIcons";

export default function AdminVendorsPage() {
    const { setTitle, setIcon } = useAdminTitle()
    const { id } = useParams()
    const navigate = useNavigate()

    const [vendor, setVendor] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch(`http://localhost:3000/admin/vendors/update/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ name: vendor.name })
            })
            if (!res.ok) throw new Error("Error al actualizar el nombre");
            alert("Estado actualizado correctamente");
            if (res.ok) {
                navigate("/admin/vendors")
            }
        } catch (error) {
            alert(error.message);

        }
    }

    useEffect(() => {
        const fetchVendor = async () => {
            const res = await fetch(`http://localhost:3000/admin/vendors/get/${id}`, {
                credentials: "include"
            })
            if (!res.ok) throw new Error("No se pudo obtener el vendedor")
            const data = await res.json()
            setVendor(data)
        }
        fetchVendor()
        setTitle("Editar Vendedor")
        setIcon(<VendorIcon color={"white"} size={30}/>)
    }, [id])

    return (
        <div className="flex flex-col h-full w-full gap-6">
            <div className="">
                <form className="flex flex-col rounded bg-white p-4 gap-5" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <label htmlFor="name" className="block font-medium text-gray-700">Nombre</label>
                            <input
                                value={vendor?.name}
                                onChange={(e) =>
                                    setVendor({ ...vendor, name: e.target.value })
                                }
                                className="w-full border rounded-md px-3 py-2" />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label htmlFor="name" className="block font-medium text-gray-700">Items</label>
                        <div className="w-full border rounded-md px-3 py-2 h-[200px] overflow-auto">
                            {vendor?.items?.length > 0 ? (
                                <ul>
                                    {vendor.items.map((item) => (
                                        <li key={item.product_id} className="flex justify-between my-2 mb- border-b border-gray-300">
                                            <div className="flex items-center gap-3 py-2">
                                                <img src={item.image_url} alt={item.name}
                                                    className="h-16" />
                                                <span className="text-lg">{item.name}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )
                                : (
                                    <p>No se encontraron productos</p>
                                )}

                        </div>
                        <div className="space-y-1 mt-3">
                            <button className="p-2 bg-zinc-800 rounded-md text-white">
                                Actualizar
                            </button>
                        </div>
                    </div>
                </form>
            </div >
        </div >
    )
}