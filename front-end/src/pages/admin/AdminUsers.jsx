import { useEffect, useState } from "react";
import { useAdminTitle } from "../../context/admin/AdminTitleContext";

import { Table } from "../../components/admin/Table";
import { AdminSearchBar } from "../../components/admin/AdminSearchBar";
import { Link } from "react-router-dom";
import { userColumns as columns } from "../../utils/columns";
import { useUsers } from "../../hooks/admin/useUsers";

export default function AdminUsers() {
    const { setTitle } = useAdminTitle()

    const { users, setUsers } = useUsers()

    const [searchTerm, setSearchTerm] = useState("")

    const searchUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()))

    const deleteUser = async (id) => {
        const res = await fetch(`http://localhost:3000/admin/users/delete/${id}`, {
            method: "POST",
            credentials: "include"
        });

        if (res.ok) {
            setUsers((prev) => prev.filter(user => user.user_id !== id))
        } else {
            console.log("Producto eliminado");
        }
    }

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