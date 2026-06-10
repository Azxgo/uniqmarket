import { Link } from "react-router-dom";
import { formatter } from "./formatter";
import { Puntuacion } from "../components/Puntuacion";

export const productColumns = [
    {
        label: "Nombre",
        field: "name",
        width: "w-[380px]",
        sortable: true,
        render: (p) => (
            <div className="flex items-center gap-3">
                <img src={p.image_url} className="w-6 h-6 bg-gray-800 shrink-0" />
                <Link to={`/admin/product/${p.product_id}`} className="truncate">
                    {p.name}
                </Link>
            </div>
        )
    },
    { label: "Categoría", field: "category_name", width: "w-[120px]", sortable: true, filterable: true },
    { label: "Precio", field: "price", width: "w-[100px]", sortable: true, render: (p) => formatter.format(p.price) },
    { label: "Vendedor", field: "vendor_name", sortable: true, filterable: true },
    { label: "Stock", field: "stock", width: "w-[80px]", sortable: true },
    {
        label: "Calificación", field: "avg_rating", sortable: true, render: (p) =>
            <div className="flex items-center gap-2">
                <Puntuacion average={p.avg_rating} editable={false} size={20} /> <span>{p.avg_rating ? p.avg_rating : "0"}</span>
            </div>
    },
]

export const orderColumns = [
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

export const userColumns = [
    {
        label: "Nombre", field: "name", sortable: true,
        render: (u) => (
            <div className="flex items-center gap-3">
                <Link to={`/admin/user/${u.user_id}`} className="truncate">
                    {u.name}
                </Link>
            </div>
        )
    },
    { label: "Email", field: "email", sortable: true },
    { label: "Rol", field: "role", sortable: true, filterable: true },
    {
        label: "Creado en",
        field: "created_at",
        sortable: true,
        render: (user) => new Date(user.created_at).toLocaleDateString("es-CL", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        })
    }
]

export const vendorColumns = [
    {
        label: "Vendor ID", field: "vendor_id",
        render: (v) => (
            <div className="flex items-center gap-3">
                <Link to={`/admin/vendor/${v.vendor_id}`} className="truncate">
                    {v.vendor_id}
                </Link>
            </div>
        )
    },
    { label: "Nombre", field: "name" },
    { label: "Productos", field: "total_products", sortable: true }

]