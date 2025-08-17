import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const AdminRoute = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(null)

    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const res = await fetch("http://localhost:3000/auth/verify", { credentials: "include" });
                const data = await res.json()
                if (data.authenticated && data.role === "admin") {
                    setIsAdmin(true)
                } else {
                    setIsAdmin(false)
                }
            } catch (e) {
                console.error(err);
                setIsAdmin(false);
            }
        };
        checkAdmin()
    }, [])

    if (isAdmin === null) return <p>Cargando...</p>; // mientras verifica

    if (!isAdmin) return <Navigate to="/login" />; // redirige si no es admin

    return children;
}