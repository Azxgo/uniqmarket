import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext()

export const useAuthContext = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [redirectTo, setRedirectTo] = useState(null);
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {
        const checkToken = async () => {
            try {
                const res = await fetch("http://localhost:3000/auth/verify", {
                    credentials: "include"
                });

                const data = await res.json();

                if (data.authenticated) {
                    setUser({ username: data.username });
                } else {
                    setUser(null);
                }

            } catch (error) {
                console.log("Error en la verificación de autenticación", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkToken();
    }, []);

    const login = async (username, password) => {
        const res = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });
        if (res.ok) {
            setUser({ username });
            navigate(redirectTo || "/");
        } else {
            console.error("Error de autenticación");
            return false;
        }
    };

    const register = async (username, email, password) => {
        const res = await fetch("http://localhost:3000/auth/register", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password })
        });

        if (res.ok) {
            const data = await res.json();
            navigate("/");
            return true;
        } else {
            console.error("Error al registrar usuario");
            return false;
        }
    };

    const logout = async () => {
        if (!window.confirm("¿Seguro que quieres cerrar sesión?")) return;
        await fetch("http://localhost:3000/auth/logout", {
            method: "POST",
            credentials: "include"
        });
        setUser(null);
        navigate("/");
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, setRedirectTo, loading }}>
            {children}
        </AuthContext.Provider>
    );
};