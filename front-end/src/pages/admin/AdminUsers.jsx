import { useEffect, useState } from "react";
import { useAdminTitle } from "../../context/admin/AdminTitleContext";
import useUsers from "../../hooks/admin/useUsers";
import { Table } from "../../components/admin/Table";
import { AdminSearchBar } from "../../components/admin/AdminSearchBar";
import { Link } from "react-router-dom";

export default function AdminUsers() {
    const { setTitle } = useAdminTitle()

    const { users, setUsers } = useUsers()

    const [searchTerm, setSearchTerm] = useState("")

    const searchUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()))


    const deleteUser = async (id) => {
        const res = await fetch(`http://localhost:3000/admin/users/delete/${id}`, {
            method: "POST",
        });

        if (res.ok) {
            setUsers((prev) => prev.filter(user => user.user_id !== id))
        } else {
            console.log("Producto eliminado");
        }
    }

    const columns = [
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

    useEffect(() => {
        setTitle("Usuarios");
    }, []);

    return (
        <div>
            <div className="flex gap-2 justify-end">
                <AdminSearchBar
                    searchTerm={searchTerm}
                    onChange={setSearchTerm}
                    placeholder="Buscar Usuario..."
                />
                <Link to={"/admin/user"}>
                    <button className="px-3 py-2 text-white bg-zinc-500 rounded-md">+ Crear Usuario</button>
                </Link>
            </div>
            <Table data={searchUsers}
                columns={columns}
                onDelete={deleteUser}
                getId={(item) => item.user_id} />
        </div>
    )
}