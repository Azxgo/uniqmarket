import { useState, useEffect } from "react";

export function useData() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const [randomProds, setRandomProds] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsResponse = await fetch('http://localhost:3000/api/products');
                const categoriesResponse = await fetch('http://localhost:3000/api/categories');

                const productsData = await productsResponse.json();
                const categoriesData = await categoriesResponse.json();

                setProducts(productsData);
                setCategories(categoriesData);

                const res = await fetch('http://localhost:3000/api/rand');
                const prods = await res.json();

                setRandomProds(prods)
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };
        fetchData();
    }, []);




    return { products, categories, randomProds };
}