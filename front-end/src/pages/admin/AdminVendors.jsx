import { useEffect, useState } from "react";
import { useAdminTitle } from "../../context/admin/AdminTitleContext";
import { useVendors } from "../../hooks/admin/useVendors";
import { vendorColumns as columns } from "../../utils/columns";
import { AdminSearchBar } from "../../components/admin/AdminSearchBar";
import { Link } from "react-router-dom";
import { Table } from "../../components/admin/Table";
import { EntityModal } from "../../components/admin/EntityModal";
import { VendorIcon } from "../../icons/AdminIcons";

export default function AdminVendors() {
    const { setTitle, setIcon } = useAdminTitle()

    const { vendors, setVendors } = useVendors()

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVendor, setSelectedVendor] = useState(null);

    const [searchTerm, setSearchTerm] = useState("")

    const searchVendors = vendors.filter((vendor) =>
        vendor?.name?.toLowerCase().includes(searchTerm.toLowerCase()))

    const deleteVendor = async (id) => {
        const res = await fetch(`http://localhost:3000/admin/vendors/delete/${id}`, {
            method: "DELETE",
            credentials: "include"
        });

        if (res.ok) {
            setVendors((prev) => prev.filter(vendor => vendor.vendor_id !== id));
        } else {
            console.error("No se pudo eliminar el vendedor");
        }
    };

    const handleAddClick = () => {
        setSelectedVendor(null)
        setIsModalOpen(true)
    }

    const handleSave = async (_, newName) => {
        if (!newName?.trim()) return;

        try {
            const res = await fetch("http://localhost:3000/admin/vendors/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: newName }),
                credentials: "include"
            })
            if (res.ok) {
                const data = await res.json();
                setVendors((prev) => [...prev, data]);
                setIsModalOpen(false);
            } else {
                console.error("Error al crear el vendedor");
            }
        } catch (e) {
            console.error("Error al crear el vendedor", e);
        }
    }

    useEffect(() => {
        setTitle("Vendedores");
        setIcon(<VendorIcon color={"white"} size={30}/>)
    }, []);


    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-2 justify-end">
                <AdminSearchBar
                    searchTerm={searchTerm}
                    onChange={setSearchTerm}
                    placeholder="Buscar Vendedor..."
                />
                <button
                    onClick={handleAddClick}
                    className="px-3 py-2 text-white bg-zinc-500 rounded-md hover:bg-zinc-400 cursor-pointer transition-all duration-300">
                    + Crear Vendedor
                </button>
            </div>
            <div className="mb-4">
                <Table data={searchVendors}
                    columns={columns}
                    onDelete={deleteVendor}
                    getId={(item) => item.vendor_id} />
            </div>
            <EntityModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                entity={selectedVendor}
                entityType="Vendors"
                nameKey="name"
                onSave={handleSave}
            />
        </div>
    )
}