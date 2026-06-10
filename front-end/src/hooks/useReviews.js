import { useState, useEffect } from "react";

export function useReviews() {
    const [reviews, setReviews] = useState([]);


    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const [productsRes, categoriesRes] = await Promise.all([
                    fetch("/api/rating"),
                    fetch("/api/products/categories")
                ]);

                if (!productsRes.ok || !categoriesRes.ok) {
                    throw new Error("Error cargando datos principales");
                }

                const [productsData, categoriesData] = await Promise.all([
                    productsRes.json(),
                    categoriesRes.json()
                ]);

                setProducts(productsData);
                setCategories(categoriesData);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);


    useEffect(() => {
        const fetchRandom = async () => {
            try {
                setIsLoading(true);
                const res = await fetch("https://uniqmarket.onrender.com/api/prodcuts/rand");
                if (!res.ok) return;
                const data = await res.json();
                setRandomProds(data);
            } catch (e) {
                console.warn("Random products no disponibles");
            } finally {
                setIsLoading(false);
            }
        };

        fetchRandom();
    }, []);

    return {
        products, categories, randomProds, isLoading, error
    };
}