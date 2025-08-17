import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { Table } from "../../components/admin/Table"
import useAdmin from "../../hooks/admin/useAdmin"
import { useAdminTitle } from "../../context/admin/AdminTitleContext";
import { AdminSearchBar } from "../../components/admin/AdminSearchBar";

export default function AdminProducts() {
    const { setTitle } = useAdminTitle()

    const { products, setProducts } = useAdmin()

    const [searchTerm, setSearchTerm] = useState("")

    const searchProducts = products.filter((prod) =>
        prod.name.toLowerCase().includes(searchTerm.toLowerCase()))

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    const deleteProduct = async (id) => {
        const res = await fetch(`http://localhost:3000/admin/products/delete/${id}`, {
            method: "POST",
            credentials: "include"
        });

        if (res.ok) {
            setProducts((prev) => prev.filter(prod => prod.product_id !== id))
        } else {
            console.log("Producto eliminado");
        }
    }

    const columns = [
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
        { label: "Stock", field: "stock", width: "w-[70px]", sortable: true },
        { label: "Calificación", field: "rating", render: () => "0" },
    ]

    useEffect(() => {
        setTitle("Productos");
    }, []);

    return (
        <div>
            <div className="flex gap-2 justify-end">
                <AdminSearchBar
                    searchTerm={searchTerm}
                    onChange={setSearchTerm}
                    placeholder="Buscar Producto..."
                />
                <Link to={"/admin/product"}>
                    <button className="px-3 py-2 text-white bg-zinc-500 rounded-md">+ Crear Producto</button>
                </Link>
            </div>
            <Table data={searchProducts}
                columns={columns}
                onDelete={deleteProduct}
                getId={(item) => item.product_id} />
        </div>
    )
}