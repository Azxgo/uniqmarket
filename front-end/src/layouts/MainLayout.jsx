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
        <div>
            <header>
                <Header />
            </header>
            <main className="flex flex-col justify-start items-center sm:pt-[240px] md:pt-[100px] py-5 px-8 w-full min-h-150 bg-gray-100">
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}