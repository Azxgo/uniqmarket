import { useEffect, useState } from "react";

export function useCategories() {
    const [categories, setCategories] = useState([])
    const [isLoading, setIsloading] = useState(true)

    const fetchAllCategories = async () => {
        try {
            setIsloading(true)
            const catRes = await fetch("https://uniqmarket.onrender.com/api/admin/category/getAll", {
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