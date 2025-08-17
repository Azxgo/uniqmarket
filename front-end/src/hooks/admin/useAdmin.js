import { useEffect, useState } from "react"

export default function useAdmin() {
    const [products, setProducts] = useState([])

    const fetchAllProducts = async () => {
        try {
            const productsRes = await fetch("http://localhost:3000/admin/products/getAll", {
                credentials: "include"
            })
            const productsData = await productsRes.json();

            setProducts(productsData);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    }

    useEffect(() => {
        fetchAllProducts()
    }, [])

    return { products, setProducts }
}