import { useEffect, useState } from "react"

export default function useAdmin() {
    const [products, setProducts] = useState([])
    const [topProducts, setTopProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [ratings, setRatings] = useState({ total_reviews: 0 });

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

    const fetchRatings = async () => {
        try {
            const res = await fetch("https://uniqmarket.onrender.com/api/rating/getAll", {
                credentials: "include"
            });
            const data = await res.json();
            setRatings(data);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        fetchAllProducts()
        fetchTopProducts()
        fetchRatings();
    }, [])

    return { products, setProducts, topProducts, isLoading, ratings }
}