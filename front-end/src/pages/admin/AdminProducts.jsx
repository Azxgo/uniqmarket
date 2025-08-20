import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { Table } from "../../components/admin/Table"
import useAdmin from "../../hooks/admin/useAdmin"
import { useAdminTitle } from "../../context/admin/AdminTitleContext";
import { AdminSearchBar } from "../../components/admin/AdminSearchBar";
import { productColumns as columns } from "../../utils/columns";

export default function AdminProducts() {
    const { setTitle } = useAdminTitle()

    const { products, setProducts } = useAdmin()

    const [searchTerm, setSearchTerm] = useState("")

    const searchProducts = products.filter((prod) =>
        prod.name.toLowerCase().includes(searchTerm.toLowerCase()))

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