import { useEffect, useState } from "react"
import { apiClient } from "../../config/apiClient"

export function useUsers() {
    const [users, setUsers] = useState([])
    const [isLoading, setIsloading] = useState(true)

    const fetchAllUsers = async () => {
        try {
            setIsloading(true)
            const userRes = await apiClient("/api/admin/users/getAll", {
                credentials: "include"
            })
            const userData = await userRes.json();

            setUsers(userData);
        } catch (error) {
            console.error("Error fetching data", error);
        } finally {
            setIsloading(false)
        }
    }

    useEffect(() => {
        fetchAllUsers()
    }, [])

    return { users, setUsers, isLoading }
}