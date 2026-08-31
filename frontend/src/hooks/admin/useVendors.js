import { useEffect, useState } from "react";
import { apiClient } from "../../config/apiClient";

export function useVendors() {
    const [vendors, setVendors] = useState([])
    const [isLoading, setIsloading] = useState(true)

    const fetchAllVendors = async () => {
        try {
            setIsloading(true)
            const venRes = await apiClient("/api/admin/vendors/getAll", {
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