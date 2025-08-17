import { useState } from "react";
import { useSorter } from "../../hooks/admin/useSorter";
import { usePagination } from "../../hooks/admin/usePagination";
import { DropdownMenu } from "./DropdownMenu";

export function Table({ data, columns, onDelete, getId }) {
    const [menuOptions, setMenuOptions] = useState(null)
    const [selectedIds, setSelectedIds] = useState([])
    const [activeFilters, setActiveFilters] = useState({})

    const getFilteredData = () => {
        return data.filter(item =>
            Object.entries(activeFilters).every(([field, values]) =>
                values.includes(item[field]))
        )
    }

    const filteredData = getFilteredData()
    const { sortedData, sortField, sortDirection, handleSort } = useSorter(filteredData)

    const { currentPage,
        totalPages,
        currentItems,
        itemsPer,
        handlePrevious,
        handleNext,
        changeItemsPerPage } = usePagination(sortedData)

    const toggleMenu = (id) => {
        setMenuOptions(menuOptions === id ? null : id)
    }

    const toggleSelect = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])
    }

    const toggleSelectAll = () => {
        const currentPageIds = currentItems.map(getId);
        const allselected = currentPageIds.every((id) => selectedIds.includes(id))

        setSelectedIds((prev) =>
            allselected
                ? prev.filter((id) => !currentPageIds.includes(id))
                : [...new Set([...prev, ...currentPageIds])])
    }

    const handleBulkDelete = () => {
        selectedIds.forEach((id) => onDelete(id));
        setSelectedIds([]);
    }

    const getValueCounts = (field) => {
        const counts = {}

        data.forEach((item) => {
            const value = item[field];
            counts[value] = (counts[value] || 0) + 1
        });

        return counts
    }

    const toggleFilter = (field, value) => {
        setActiveFilters(prev => {
            const currentValues = prev[field] || [];

            const newValues = currentValues.includes(value)
                ? currentValues.filter(v => v !== value)
                : [...currentValues, value]

            const updatedFilters = {
                ...prev,
                [field]: newValues
            }

            if (updatedFilters[field].length === 0) {
                delete updatedFilters[field]
            }

            return { ...updatedFilters }
        })
    }

    return (
        <div>
            <div className="flex gap-2 p-2 items-center">
                <p>Filtrar por: </p>
                {columns.filter(col => col.filterable).map(col => (
                    <div
                        key={col.field}
                        className="px-3 py-1 border-1 border-gray-400 rounded-md">
                        <DropdownMenu
                            isOpen={menuOptions === col.field}
                            onToggle={() => toggleMenu(col.field)}
                            label={col.label}
                        >
                            {(() => {
                                const counts = getValueCounts(col.field);
                                return Object.entries(counts).map(([value, count]) => (
                                    <li key={value}>
                                        <button
                                            onClick={() => toggleFilter(col.field, value)}
                                            className={`w-full text-left px-2 py-1 whitespace-nowrap hover:bg-gray-100
                                            ${activeFilters[col.field]?.includes(value) ? 'bg-blue-100 font-semibold' : ''}`}>
                                            {value} ({count})
                                        </button>
                                    </li>
                                ));
                            })()}
                        </DropdownMenu>
                    </div>
                ))}
            </div>


            {selectedIds.length > 0 && (
                <div className="flex w-full mb-2 px-4 py-2 rounded-md justify-between bg-blue-200">
                    <p>({selectedIds.length}) Elementos Seleccionados </p>
                    <button
                        onClick={handleBulkDelete}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                    >

                    </button>
                </div>
            )}
            <div className="overflow-x-auto">
                <table className="table-fixed w-full text-left divide-y divide-gray-500/20 bg-white rounded-md">

                    <thead className="">
                        <tr>
                            <th className="px-1 py-2 text-center w-[40px]">
                                <input
                                    type="checkbox"
                                    onChange={toggleSelectAll}
                                    checked={currentItems.length > 0 && currentItems.every(item => selectedIds.includes(getId(item)))} />
                            </th>
                            {columns.map(({ label, field, width, sortable }) => (
                                <th
                                    key={field}
                                    className={`px-1 py-2 ${width ?? ''} select-none`}
                                    onClick={sortable ? () => handleSort(field) : undefined}
                                >
                                    {label}

                                    {sortField === field &&
                                        (sortDirection === "asc" ? " ▼" :
                                            sortDirection === "desc" ? "▲" : "")
                                    }
                                </th>
                            ))}

                            <th className="px-1 py-2 text-center w-[100px] select-none">Acciones</th>
                        </tr>
                    </thead>

                    <tbody className="bg-white">
                        {currentItems.map((item) => {
                            const id = getId(item)
                            return (
                                <tr key={id}>
                                    <td className="px-1 py-2 text-center">
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.includes(id)}
                                            onChange={() => toggleSelect(id)} />
                                    </td>
                                    {columns.map(({ field, render }) => (
                                        <td key={field} className="px-1 py-2">
                                            {render ? render(item) : item[field]}
                                        </td>
                                    ))}

                                    <td className="px-2 py-2 text-center">
                                        <DropdownMenu
                                            isOpen={menuOptions === id}
                                            onToggle={() => toggleMenu(id)}
                                            label="..."
                                        >
                                            <li>
                                                <button onClick={() => onDelete(id)}>
                                                    Eliminar
                                                </button>
                                            </li>
                                        </DropdownMenu>

                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center mt-4 px-2">
                <div className="flex gap-2">
                    <span>Mostrar:</span>
                    {[10, 20, 30].map((amount) => (
                        <button
                            key={amount}
                            onClick={() => changeItemsPerPage(amount)}
                            className={`px-3 py-1 rounded border
                                                ${itemsPer === amount
                                    ? "bg-blue-500 text-white"
                                    : "bg-white text-black"
                                }`}
                        >
                            {amount}
                        </button>
                    ))}
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={handlePrevious} disabled={currentPage === 1}
                        className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
                    >
                        {"<"}
                    </button>
                    <span>Página {currentPage} de {totalPages}</span>
                    <button
                        onClick={handleNext} disabled={currentPage === totalPages}
                        className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
                    >
                        {">"}
                    </button>
                </div>
            </div>
        </div>
    )
}