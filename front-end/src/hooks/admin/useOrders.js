import { useState, useEffect } from "react";

export default function useOrders() {
    const [orders, setOrders] = useState([])

    const fetchAllOrders = async () => {
        try {
            const ordRes = await fetch("http://localhost:3000/admin/orders/getAll", {
                credentials: "include"
            })
            const ordData = await ordRes.json()

            setOrders(ordData)
        } catch (error) {
            console.error("Error fetching data", error);
        }
    }

    useEffect(() => {
        fetchAllOrders()
    }, [])

    return { orders, setOrders }
}