import { useState } from "react"
import { useMemo } from "react"

export function usePagination(data, itemsPerPage = 10) {
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPer, setItemsPer] = useState(itemsPerPage)

    const totalPages = Math.ceil(data.length / itemsPer)

    const currentItems = useMemo(() => {
        const start = (currentPage - 1) * itemsPer
        return data.slice(start, start + itemsPer)
    }, [data, currentPage, itemsPer])

    const handleNext = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages))
    }

    const handlePrevious = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1))
    }

    const changeItemsPerPage = (count) => {
        setItemsPer(count)
        setCurrentPage(1)
    }


    return {
        currentPage,
        totalPages,
        currentItems,
        itemsPer,
        handlePrevious,
        handleNext,
        changeItemsPerPage,
    }
}