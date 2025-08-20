import { useEffect, useState } from "react";
import { Table } from "../../components/admin/Table";
import { useAdminTitle } from "../../context/admin/AdminTitleContext"
import useOrders from "../../hooks/admin/useOrders"
import { AdminSearchBar } from "../../components/admin/AdminSearchBar";
import { orderColumns as columns } from "../../utils/columns";

export default function AdminOrders() {
    const { setTitle } = useAdminTitle()

    const { orders, setOrders } = useOrders()

    const [searchTerm, setSearchTerm] = useState("")

    const searchOrder = orders.filter((ord) =>
        String(ord.order_id).toLowerCase().includes(searchTerm.toLowerCase()))

    const deleteOrder = async (id) => {
        const res = await fetch(`http://localhost:3000/admin/orders/delete/${id}`, {
            method: "POST",
            credentials: "include"
        });

        if (res.ok) {
            setOrders((prev) => prev.filter(ord => ord.order_id !== id))
        } else {
            console.log("Producto eliminado");
        }
    }

    useEffect(() => {
        setTitle("Ordenes");
    }, []);

    return (
        <div>
            <div className="flex gap-2 justify-end">
                <AdminSearchBar
                    searchTerm={searchTerm}
                    onChange={setSearchTerm}
                    placeholder="Buscar ID"
                />
            </div>
            <Table
                data={searchOrder}
                columns={columns}
                onDelete={deleteOrder}
                getId={(ord) => ord.order_id} />
        </div>
    )
}