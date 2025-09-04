import { useEffect, useState } from "react"

export function EntityModal
    ({
        isOpen,
        onClose,
        entity,
        entityType = "entity",
        nameKey = "name",
        onSave
    }) {

    const [newName, setNewName] = useState(entity?.[nameKey] || "")

    useEffect(() => {
        setNewName(entity?.[nameKey] || "")
    }, [entity, nameKey])

    const entityNames = {
        vendors: { singular: "Vendedor", plural: "Vendedores" },
        category: { singular: "Categoría", plural: "Categorías" },
    }

    const names = entityNames[entityType.toLowerCase()] || { singular: entityType, plural: entityType }

    const handleSave = () => {
        const id = entity ? entity[`${entityType.toLowerCase()}_id`] : null
        if (!newName.trim()) return
        onSave(id, newName)
        onClose()
    }

    const handleDelete = async () => {
        if (!entity) return;
        const confirmDelete = window.confirm(`¿Estás seguro de eliminar este ${names.singular}?`);
        if (!confirmDelete) return

        try {
            const res = await fetch(`http://localhost:3000/admin/${entityType}/delete/${entity[`${entityType.toLowerCase()}_id`]}`, {
                method: "DELETE",
                credentials: "include"
            });

            const data = await res.json

            if (res.ok) {
                onSave(null, null, entity[`${entityType.toLowerCase()}_id`]);
                onClose();
            } else {
                alert(data.error || `No se pudo eliminar el ${names.singular}`);
            }
        } catch (e) {
            console.error(`Error al eliminar ${names.singular}`, e);
            alert(`Error al eliminar${names.singular}`);
        }
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="flex flex-col bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">
                        {entity ? `Editar ${names.singular}` : `Crear ${names.singular}`}
                    </h2>
                    <button className="px-4 py-2 rounded-md hover:bg-gray-300" onClick={onClose}>
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
                    {entity && (
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
    );
}

