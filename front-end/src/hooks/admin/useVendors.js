import { useEffect, useState } from "react";

export function useVendors() {
    const [vendors, setVendors] = useState([])

    const fetchAllVendors = async () => {
        try {
            const venRes = await fetch("http://localhost:3000/admin/vendors/getAll", {
                credentials: "include"
            })
            const venData = await venRes.json()
            setVendors(venData)
        } catch (e) {
            console.error("Error fetching data", e);
        }
    }

    useEffect(()=> {
        fetchAllVendors()
    }, [])

    return {vendors, setVendors}
}