import { useState, useEffect } from "react";
import { useData } from "./useData";
import { useFiltersContext } from "../context/filtersContext";
import { useSearchParams } from "react-router-dom";

export function useFilters(name, initialPage = 1) {
    const [searchParams, setSearchParams] = useSearchParams()

    const pageFromParams = parseInt(searchParams.get("page")) || initialPage;

    const {
        selectedBrands, setSelectedBrands,
        minValue, setMinValue,
        maxValue, setMaxValue
    } = useFiltersContext();

    const { products, categories } = useData();

    const [sortType, setSortType] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(pageFromParams);
    const itemsPerPage = 8;

    const handlePageChange = (page) => {
        setIsLoading(true);
        setCurrentPage(page);
    };

    useEffect(() => {
        if (isLoading) {
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 1500);

            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    useEffect(() => {
        const updatedParams = new URLSearchParams(searchParams.toString());

        let shouldUpdate = false;

        if (selectedBrands.length > 0) {
            setCurrentPage(1);
            updatedParams.set("page", "1");
            shouldUpdate = true;
        }

        if (minValue > 0 && maxValue > 0) {
            setCurrentPage(1);
            updatedParams.set("page", "1");
            shouldUpdate = true;
        }

        if (shouldUpdate) {
            setSearchParams(updatedParams);
        }
    }, [selectedBrands, maxValue, minValue]);

    const sortProducts = (type) => {
        setSortType(type);
    };

    const categoryParams = () => {
        if (!products || products.length === 0) return { filteredProducts: [], allBrands: [] };

        const category = categories.find((cat) => cat.name.toLowerCase() === name);
        const categoryId = category ? category.category_id : null;

        let filtered = categoryId
            ? products.filter((prod) => prod.category_id === categoryId)
            : products;

        const searchTerm = searchParams.get("search")?.toLowerCase() || "";
        if (searchTerm) {
            filtered = filtered.filter((prod) => prod.name.toLowerCase().includes(searchTerm));
        }

        filtered = filtered.filter((prod) =>
            (minValue === undefined || prod.price >= minValue) &&
            (maxValue === undefined || prod.price <= maxValue)
        );

        const allBrands = [...new Set(filtered.map((prod) => prod.brand))];

        if (selectedBrands.length > 0) {
            filtered = filtered.filter((prod) => selectedBrands.includes(prod.brand));
        }

        return { filteredProducts: filtered, allBrands };
    };
    const { filteredProducts, allBrands } = categoryParams();

    const sortedProducts = (() => {
        if (!sortType) return filteredProducts;

        return [...filteredProducts].sort((a, b) => {
            if (sortType === "a-z") return a.name.localeCompare(b.name);
            if (sortType === "z-a") return b.name.localeCompare(a.name);
            if (sortType === "price_asc") return a.price - b.price;
            if (sortType === "price_desc") return b.price - a.price;
            return 0;
        });
    })();

    const resetFilters = () => {
        setSelectedBrands([]);
        setMinValue(0);
        setMaxValue(Infinity);
    };

    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage);

    return {
        filteredProducts,
        paginatedProducts,
        totalPages,
        currentPage,
        setCurrentPage: handlePageChange,
        allBrands,
        resetFilters,
        sortProducts,
        isLoading
    };
}