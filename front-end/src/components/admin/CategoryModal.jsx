import { useState, useEffect } from "react";

export default function CategoryModal({ isOpen, onClose, category, onSave }) {
    const [newName, setNewName] = useState(category?.category_name || "");

    useEffect(() => {
        setNewName(category?.category_name || "");
    }, [category]);

    const handleSave = () => {
        const id = category ? category.category_id : null;
        if (!newName.trim()) return;
        onSave(id, newName);
        onClose();
    };

    const handleDelete = async () => {
        if (!category) return;
        const confirmDelete = window.confirm("¿Estás seguro de eliminar esta categoría?");
        if (!confirmDelete) return;

        try {
            const res = await fetch(`http://localhost:3000/admin/category/delete/${category.category_id}`, {
                method: "DELETE",
                credentials: "include"
            });

            const data = await res.json();

            if (res.ok) {
                onSave(null, null, category.category_id);
                onClose();
            } else {
                alert(data.error || "No se pudo eliminar la categoría");
            }
        } catch (e) {
            console.error("Error al eliminar categoría", e);
            alert("Error al eliminar categoría");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 ">
            <div className="flex flex-col  bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">
                        {category ? "Editar Categoría" : "Nueva Categoría"}
                    </h2>
                    <button
                        className="px-4 py-2 rounded-md hover:bg-gray-300"
                        onClick={onClose}
                    >
                        X
                    </button>
                </div>
                <input
                    type="text"
                    className="border w-full px-3 py-2 rounded-md mb-4"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                />
                <div className="flex justify-end gap-2">

                    <div className="flex gap-2">
                        {category && (
                            <button
                                className="px-4 py-2 rounded-md bg-red-600 text-white"
                                onClick={handleDelete}
                            >
                                Eliminar
                            </button>
                        )}

                        <button
                            className="px-4 py-2 rounded-md bg-blue-600 text-white"
                            onClick={handleSave}
                        >
                            Guardar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}