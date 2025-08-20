import { useNavigate, useParams } from "react-router-dom"
import { useAdminTitle } from "../../context/admin/AdminTitleContext"
import { useEffect, useState } from "react"


export default function AdminOrdersPage() {
    const { setTitle } = useAdminTitle()

    const { id } = useParams()
    const navigate = useNavigate()

    const [order, setOrder] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch(`http://localhost:3000/admin/orders/update/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ status: order.status }),
            })
            if (!res.ok) throw new Error("Error al actualizar el estado");
            alert("Estado actualizado correctamente");
            if (res.ok) {
                navigate("/admin/orders")
            }
        } catch (error) {
            alert(error.message);
        }

    }

    useEffect(() => {
        const fetchOrder = async () => {
            const res = await fetch(`http://localhost:3000/admin/orders/get/${id}`, {
                credentials: "include"
            })
            if (!res.ok) throw new Error("No se pudo obtener la orden")
            const data = await res.json()
            setOrder(data)
        }
        fetchOrder();
    }, [id])

    useEffect(() => {
        setTitle("Ordenes");
    }, [])

    return (
        <div className="flex flex-col h-full w-full gap-6">
            <div className="">
                <form className="flex flex-col rounded bg-white p-4 gap-5" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <label htmlFor="name" className="block font-medium text-gray-700">Nombre Comprador</label>
                            <div className="w-full border rounded-md px-3 py-2" >
                                {order?.name}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label htmlFor="name" className="block font-medium text-gray-700">Fecha</label>
                            <div className="w-full border rounded-md px-3 py-2">
                                {new Date(order?.order_date).toLocaleString()}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label htmlFor="name" className="block font-medium text-gray-700">Estado</label>
                            <select
                                id="status"
                                className="w-full border rounded-md px-3 py-2 appearance-none"
                                value={order?.status || ""}
                                onChange={(e) =>
                                    setOrder((prev) => ({ ...prev, status: e.target.value }))
                                }
                            >
                                <option value="pendiente">Pendiente</option>
                                <option value="completada">Completada</option>
                                <option value="cancelada">Cancelada</option>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label htmlFor="name" className="block font-medium text-gray-700">Total</label>
                            <div className="w-full border rounded-md px-3 py-2" >
                                ${order?.total}
                            </div>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label htmlFor="name" className="block font-medium text-gray-700">Items</label>
                        <div className="w-full border rounded-md px-3 py-2 h-[200px] overflow-auto">
                            {order?.items?.length > 0 ? (
                                <ul>
                                    {order.items.map((item) => (
                                        <li key={item.product_id} className="flex justify-between my-2 border-b border-gray-300">
                                            <div className="flex items-center gap-2">
                                                <img src={item.product_image} alt={item.product_name}
                                                    className="h-16" />
                                                <span>{item.product_name}</span>
                                            </div>
                                            <span className="flex items-center">
                                                {item.quantity} x {item.price}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            )
                                : (
                                    <p>No se encontraron productos</p>
                                )}

                        </div>
                        <div className="space-y-1">
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