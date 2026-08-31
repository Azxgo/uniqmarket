import { useEffect, useState } from "react";
import { apiClient } from "../../config/apiClient";

export function useCategories() {
    const [categories, setCategories] = useState([])
    const [isLoading, setIsloading] = useState(true)

    const fetchAllCategories = async () => {
        try {
            setIsloading(true)
            const catRes = await apiClient("/api/admin/category/getAll", {
                credentials: "include"
            })
            const catData = await catRes.json()
            
            setCategories(catData)
        } catch (error) {
            console.error("Error fetching data", error);
        } finally {
            setIsloading(false)
        }
    }

    useEffect(() => {
        fetchAllCategories()
    }, [])

    return { categories, setCategories, isLoading }
}