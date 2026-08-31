import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";

export function MainLayout() {
    const { expired, setExpired } = useAuth()

    useEffect(() => {
        if (expired) {
            alert("Tu sesión ha expirado.")
            setExpired(false)
        }
    }, [expired])
    
    return (
        <div className="bg-gray-100">
            <header>
                <Header />
            </header>
            <main className="container mx-auto pt-[100px] px-5 w-full mb-5 min-h-screen ">
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}