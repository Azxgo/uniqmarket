import { useState, useEffect, useMemo } from "react";

export default function useOrders() {
    const [orders, setOrders] = useState([])
    const [isLoading, setIsloading] = useState(true)

    const fetchAllOrders = async () => {
        try {
            setIsloading(true)
            const ordRes = await fetch("https://uniqmarket.onrender.com/api/admin/orders/getAll", {
                credentials: "include"
            })
            const ordData = await ordRes.json()

            setOrders(ordData)
        } catch (error) {
            console.error("Error fetching data", error);
        } finally {
            setIsloading(false)
        }
        
    }

    useEffect(() => {
        fetchAllOrders()
    }, [])

    const totalRenueves = useMemo(() => {
        return orders.reduce((acc, order) => acc + parseFloat(order.total || 0), 0)
    }, [orders])

    return { orders, setOrders, totalRenueves, isLoading }
}