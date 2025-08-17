import { useEffect, useState } from "react";
import { Table } from "../../components/admin/Table";
import { useAdminTitle } from "../../context/admin/AdminTitleContext"
import useOrders from "../../hooks/admin/useOrders"
import { AdminSearchBar } from "../../components/admin/AdminSearchBar";
import { Link } from "react-router-dom";

export default function AdminOrders() {
    const { setTitle } = useAdminTitle()

    const { orders, setOrders } = useOrders()

    const [searchTerm, setSearchTerm] = useState("")

    const searchOrder = orders.filter((ord) =>
        String(ord.order_id).toLowerCase().includes(searchTerm.toLowerCase()))

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    const deleteOrder = async (id) => {
        const res = await fetch(`http://localhost:3000/admin/orders/delete/${id}`, {
            method: "POST",
        });

        if (res.ok) {
            setOrders((prev) => prev.filter(ord => ord.order_id !== id))
        } else {
            console.log("Producto eliminado");
        }
    }

    const columns = [
        {
            label: "Order ID", field: "order_id",
            render: (o) => (
                <div className="flex items-center gap-3">
                    <Link to={`/admin/order/${o.order_id}`} className="truncate">
                        {o.order_id}
                    </Link>
                </div>
            )
        },
        { label: "Usuario", field: "name", sortable: true },
        {
            label: "Fecha Orden",
            field: "order_date",
            sortable: true,
            render: (ord) => new Date(ord.order_date).toLocaleDateString("es-CL", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            })
        },
        { label: "Status", field: "status", sortable: true, filterable: true },
        { label: "Total", field: "total", sortable: true, render: (p) => formatter.format(p.total) },
    ]

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