import { useEffect, useState } from "react"

export default function useAdmin() {
    const [products, setProducts] = useState([])
    const [topProducts, setTopProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchAllProducts = async () => {
        try {
            setIsLoading(true);
            const productsRes = await fetch("https://uniqmarket.onrender.com/api/admin/products/getAll", {
                credentials: "include"
            })
            const productsData = await productsRes.json();

            setProducts(productsData);
        } catch (error) {
            console.error("Error fetching data", error);
        } finally {
            setIsLoading(false);
        }
    }

    const fetchTopProducts = async () => {
        try {
            const productsRes = await fetch("https://uniqmarket.onrender.com/api/admin/products/getTopProducts", {
                credentials: "include"
            })
            const productsData = await productsRes.json();

            setTopProducts(productsData);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    }

    useEffect(() => {
        fetchAllProducts()
        fetchTopProducts()
    }, [])

    return { products, setProducts, topProducts, isLoading }
}