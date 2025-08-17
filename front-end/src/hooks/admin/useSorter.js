import { useMemo } from "react";
import { useState } from "react";

export function useSorter(data, initialSortField = null) {
    const [sortField, setSortField] = useState(initialSortField)
    const [sortDirection, setSortDirection] = useState("none")

    const sortedData = useMemo(() => {
        if (!sortField || sortDirection === "none") return data

        const sorted = [...data].sort((a, b) => {
            let aVal = a[sortField];
            let bVal = b[sortField];

            const numeric = typeof aVal === "number" || typeof bVal === "number"

            if (numeric) {
                return sortDirection === "asc" ? aVal - bVal : bVal - aVal
            } else {
                return sortDirection === "asc"
                    ? String(aVal).localeCompare(String(bVal))
                    : String(bVal).localeCompare(String(aVal))
            }
        });

        return sorted
    }, [data, sortField, sortDirection])

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection((prev) => {
                if (prev === "none") return "asc"
                if (prev === "asc") return "desc"
                return "none"
            })
        } else {
            setSortField(field)
            setSortDirection("asc")
        }
    }

    return {
        sortedData,
        sortField,
        sortDirection,
        handleSort,
    }
}