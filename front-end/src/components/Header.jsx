import { Categories } from "./nav-bar/Categories";
import { LoginButtons } from "./nav-bar/LoginButtons";
import { SearchBar } from "./nav-bar/SearchBar";
import { Cart } from "./nav-bar/Cart";
import { useAuthContext } from "../context/authContext";
import { Link } from "react-router-dom";
import { useState } from "react"
import { AccesioriosIcon, AlimentosIcon, AllProductsIcon, ColecciónIcon, HogarIcon, LiteraturaIcon, MascotaIcon, MisceláneoIcon, ModaIcon, MusicaIcon, TecnologíaIcon } from "../icons/CategoryIcons";

export function Header() {
    const { user, logout, loading } = useAuthContext()

    const [isOpen, setIsOpen] = useState(false)

    const toggleOpen = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <nav className="fixed top-0 left-0 w-full flex flex-col md:flex-row 
            items-center justify-between bg-zinc-500 px-4 py-2 z-51
            md:h-[75px] space-y-2  md:space-y-0">
                <div className="flex items-center flex-shrink-0">
                    <a href="/">
                        <img src="/img/logo.png" alt="Logo" className="w-20 md:w-24 min-w-[80px] object-contain" />
                    </a>
                </div>

                <div className="flex md:flex-row w-full justify-center items-center md:gap-14 text-center">
                    <button onClick={toggleOpen}>
                        <Categories />
                    </button>
                    <SearchBar />
                </div>

                <div className="flex gap-2 md:gap-4 items-center w-full md:w-auto justify-center md:justify-end">
                    {loading ? (
                        <p className="text-white">Loading...</p> //
                    ) : user ? (
                        <>
                            <LoginButtons>{user.username}</LoginButtons>
                            <LoginButtons onClick={logout}>Logout</LoginButtons>
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                <LoginButtons>Iniciar Sesión</LoginButtons>
                            </Link>
                            <Link to="/register">
                                <LoginButtons>Registrarse</LoginButtons>
                            </Link>
                        </>
                    )}

                    <Cart />
                </div>
            </nav>

            <div
                className={`fixed left-0 w-full h-[calc(100vh)] bg-black z-50 transition-all duration-300 ease-in-out
                ${isOpen ? "opacity-80 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                onClick={() => setIsOpen(false)}
            />

            <div
                className={`fixed top-[75px] w-full max-h-60 bg-gray-50 transition-all duration-300 ease-in-out z-50
                ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            >
                <div className="flex flex-wrap overflow-x-auto py-4 px-10 gap-12 h-full justify-between bg-white m-2 rounded-md shadow-md ">
                    <ul className="min-w-max space-y-1 text-sm sm:text-base">
                        <li>
                            <a className="flex gap-2 p-2 rounded-md hover:bg-gray-50" href="/shop">
                                <AllProductsIcon />
                                <h1>Todos los productos</h1>
                            </a>
                        </li>
                    </ul>
                    <ul className="min-w-max text-sm sm:text-base">
                        <li>
                            <a className="flex gap-2 p-2 rounded-md hover:bg-gray-50" href="/shop/accesorios">
                                <AccesioriosIcon />
                                <h1>Accesorios</h1>
                            </a>
                        </li>
                        <li>
                            <a className="flex gap-2 p-2 rounded-md hover:bg-gray-50" href="/shop/alimentos">
                                <AlimentosIcon />
                                <h1>Alimentos</h1>
                            </a>
                        </li>
                    </ul>
                    <ul className="min-w-max text-sm sm:text-base">
                        <li>
                            <a className="flex gap-2 p-2 rounded-md hover:bg-gray-50" href="/shop/colección">
                                <ColecciónIcon />
                                <h1>Colección</h1>
                            </a>
                        </li>
                        <li>
                            <a className="flex gap-2 p-2 rounded-md hover:bg-gray-50" href="/shop/hogar">
                                <HogarIcon />
                                <h1>Hogar</h1>
                            </a>
                        </li>
                    </ul>
                    <ul className="min-w-max text-sm sm:text-base">
                        <li>
                            <a className="flex gap-2 p-2 rounded-md hover:bg-gray-50" href="/shop/literatura">
                                <LiteraturaIcon />
                                <h1>Literatura</h1>
                            </a>
                        </li>
                        <li>
                            <a className="flex gap-2 p-2 rounded-md hover:bg-gray-50" href="/shop/mascotas">
                                <MascotaIcon />
                                <h1>Mascotas</h1>
                            </a>
                        </li>
                    </ul>
                    <ul className="min-w-max text-sm sm:text-base">
                        <li>
                            <a className="flex gap-2 p-2 rounded-md hover:bg-gray-50" href="/shop/misceláneo">
                                <MisceláneoIcon />
                                <h1>Misceláneo</h1>
                            </a>
                        </li>
                        <li>
                            <a className="flex gap-2 p-2 rounded-md hover:bg-gray-50" href="/shop/moda">
                                <ModaIcon />
                                <h1>Moda</h1>
                            </a>
                        </li>
                    </ul>
                    <ul className="min-w-max text-sm sm:text-base">
                        <li>
                            <a className="flex gap-2 p-2 rounded-md hover:bg-gray-50" href="/shop/música">
                                <MusicaIcon />
                                <h1>Música</h1>
                            </a>
                        </li>
                        <li>
                            <a className="flex gap-2 p-2 rounded-md hover:bg-gray-50" href="/shop/tecnología">
                                <TecnologíaIcon />
                                <h1>Tecnología</h1>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}