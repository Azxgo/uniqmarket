import { useEffect, useState } from "react"

export default function useUsers() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const userRes = await fetch("http://localhost:3000/admin/users/getAll", {
                    credentials: "include"
                })
                const userData = await userRes.json();

                setUsers(userData);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        }
        fetchAllUsers()
    }, [])

    return { users, setUsers }
}