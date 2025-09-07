import { useEffect, useState } from "react";

export function useCategories() {
    const [categories, setCategories] = useState([])

    const fetchAllCategories = async () => {
        try {
            const catRes = await fetch("http://localhost:3000/admin/category/getAll", {
                credentials: "include"
            })
            const catData = await catRes.json()
            
            setCategories(catData)
        } catch (error) {
            console.error("Error fetching data", error);
        }
    }

    useEffect(() => {
        fetchAllCategories()
    }, [])

    return { categories, setCategories }
}