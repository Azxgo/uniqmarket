import { useEffect, useState } from "react";

export function useVendors() {
    const [vendors, setVendors] = useState([])
    const [isLoading, setIsloading] = useState(true)

    const fetchAllVendors = async () => {
        try {
            setIsloading(true)
            const venRes = await fetch("https://uniqmarket.onrender.com/api/admin/vendors/getAll", {
                credentials: "include"
            })
            const venData = await venRes.json()
            setVendors(venData)
        } catch (e) {
            console.error("Error fetching data", e);
        } finally {
            setIsloading(false)
        }
    }

    useEffect(() => {
        fetchAllVendors()
    }, [])

    return { vendors, setVendors, isLoading }
}