import { useState } from "react";
import { useSorter } from "../../hooks/admin/useSorter";
import { usePagination } from "../../hooks/admin/usePagination";
import { DropdownMenu } from "./DropdownMenu";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "../../icons/MiscIcons";

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

    const hasFilterableColumns = columns.some(col => col.filterable)

    return (
        <div className="bg-white px-6 py-2 shadow-md rounded-md">
            {hasFilterableColumns && (
                <div className="flex gap-2 p-2 items-center">
                    <p className="text-lg font-semibold">Filtrar por: </p>
                    {columns.filter(col => col.filterable).map(col => (
                        <div
                            key={col.field}
                            className="">
                            <DropdownMenu
                                isOpen={menuOptions === col.field}
                                onToggle={() => toggleMenu(col.field)}
                                label={col.label}
                            >
                                {(() => {
                                    const counts = getValueCounts(col.field);
                                    return Object.entries(counts).map(([value, count]) => (
                                        <li key={value} className="flex justify-between hover:bg-gray-100 rounded-md transition-all duration-300">
                                            <button
                                                onClick={() => toggleFilter(col.field, value)}
                                                className={`w-full text-lg text-left px-4 py-3 whitespace-nowrap rounded-md 
                                            ${activeFilters[col.field]?.includes(value) ? 'bg-gray-100 font-semibold' : ''}`}>
                                                {value} <span className="pl-1">({count})</span>
                                            </button>
                                        </li>
                                    ));
                                })()}
                            </DropdownMenu>
                        </div>
                    ))}
                </div>
            )}

            {selectedIds.length > 0 && (
                <div className="flex w-full mb-2 px-4 py-2 rounded-md justify-between bg-blue-200 items-center">
                    <p className="text-lg select-none"><span>({selectedIds.length})</span> Elementos Seleccionados </p>
                    <button
                        onClick={handleBulkDelete}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-400 cursor-pointer"
                    >
                        <TrashIcon />
                    </button>
                </div>
            )}
            <div className="bg-white rounded-lg">
                <table className="table-fixed w-full text-left divide-y divide-gray-500/20 bg-white">

                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-2 py-3 text-center w-[40px]">
                                <div className="flex text-center justify-center">
                                    <input
                                        type="checkbox"
                                        className="w-5 h-5"
                                        onChange={toggleSelectAll}
                                        checked={currentItems.length > 0 && currentItems.every(item => selectedIds.includes(getId(item)))} />
                                </div>
                            </th>
                            {columns.map(({ label, field, width, sortable }) => (
                                <th
                                    key={field}
                                    className={`px-2 py-3 ${width ?? ''} select-none text-gray-700 font-medium cursor-pointer`}
                                    onClick={sortable ? () => handleSort(field) : undefined}
                                >
                                    {label}

                                    {sortField === field &&
                                        (sortDirection === "asc" ? "  ▼" :
                                            sortDirection === "desc" ? "  ▲" : "")
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
                                <tr key={id} className="odd:bg-white even:bg-gray-100">
                                    <td className="px-2 py-3 text-center">
                                        <div className="flex text-center justify-center">
                                            <input
                                                type="checkbox"
                                                className="w-5 h-5"
                                                checked={selectedIds.includes(id)}
                                                onChange={() => toggleSelect(id)} />
                                        </div>
                                    </td>
                                    {columns.map(({ field, render }) => (
                                        <td key={field} className="px-2 py-3">
                                            {render ? render(item) : item[field]}
                                        </td>
                                    ))}

                                    <td className="px-2 py-2 text-center z-50">
                                        <DropdownMenu
                                            isOpen={menuOptions === id}
                                            onToggle={() => toggleMenu(id)}
                                            label="..."
                                        >
                                            <li className="hover:bg-gray-100 px-3 py-3 transition-all duration-300">
                                                <button className="cursor-pointer" onClick={() => onDelete(id)}>
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

            <div className="flex justify-between items-center mt-4 pb-2">
                <div className="flex gap-2 items-center">
                    <span className="text-lg font-semibold">Mostrar:</span>
                    {[10, 20, 30].map((amount) => (
                        <button
                            key={amount}
                            onClick={() => changeItemsPerPage(amount)}
                            className={`px-3 py-2 rounded-md border border-gray-400 cursor-pointer hover:bg-gray-200 transition-all duration-300
                                    ${itemsPer === amount
                                    ? "bg-gray-200"
                                    : "bg-white text-black"
                                }`}
                        >
                            {amount}
                        </button>
                    ))}
                </div>

                <div className="flex gap-3 items-center">
                    <button
                        onClick={handlePrevious}
                        disabled={currentPage === 1}
                        className={`px-3 py-2 rounded-md border border-gray-400 ${currentPage === 1 ? '' : 'cursor-pointer opacity-100 hover:bg-gray-200'
                            } opacity-50`}
                    >
                        <ChevronLeftIcon />
                    </button>
                    <span className="text-lg">Página {currentPage} de {totalPages}</span>
                    <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-2 rounded-md border border-gray-400 ${currentPage === totalPages ? '' : 'cursor-pointer opacity-100 hover:bg-gray-200'
                            } opacity-50`}
                    >
                        <ChevronRightIcon />
                    </button>
                </div>
            </div>
        </div>
    )
}