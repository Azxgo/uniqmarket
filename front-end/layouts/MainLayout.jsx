import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export function MainLayout() {
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