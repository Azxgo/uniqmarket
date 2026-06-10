import { useState } from "react"
import { Link } from "react-router-dom"

import { Categories } from "./nav-bar/Categories"
import { LoginButtons } from "./nav-bar/LoginButtons"
import { SearchBar } from "./nav-bar/SearchBar"
import { Cart } from "./nav-bar/Cart"

import { useAuthContext } from "../context/authContext"
import { useData } from "../hooks/useData"

import { categoryIcons } from "../utils/categoryIcons"
import { MisceláneoIcon, AllProductsIcon } from "../icons/CategoryIcons"
import { Menu } from "../icons/NavBarIcons"
import { UserMenu } from "./nav-bar/UserMenu"


export function Header() {
    const { user, logout, loading } = useAuthContext()
    const { categories } = useData()

    const [isOpen, setIsOpen] = useState(false)

    const closeMenu = () => setIsOpen(false);

    return (
        <>
            <header className="fixed top-0 left-0 w-full bg-zinc-500 z-50">
                <div className="max-w-7xl mx-auto h-[75px] px-4 flex items-center justify-between">

                    <Link to="/" className="flex-shrink-0">
                        <img
                            src="/img/logo.png"
                            alt="Logo"
                            className="w-20 md:w-24 object-contain"
                        />
                    </Link>

                    <div className="hidden md:flex flex-1 justify-center gap-12">
                        <button onClick={() => setIsOpen(!isOpen)}>
                            <Categories />
                        </button>
                        <SearchBar />
                    </div>

                    <div className="flex items-center gap-3">

                        <button
                            onClick={() => setIsOpen(true)}
                            className="md:hidden relative flex items-center justify-center
                            w-[66px] h-[66px] rounded-lg hover:bg-zinc-400 cursor-pointer"
                            aria-label="Abrir menú"
                        >
                            <Menu size={45} className="text-white" />
                        </button>

                        <div className="hidden md:flex gap-2">
                            <UserMenu
                                user={user}
                                loading={loading}
                                logout={logout}
                            />
                        </div>

                        <Cart />
                    </div>
                </div>

                <div
                    className={`
                    absolute top-full left-0 w-full bg-white shadow-md
                    transition-all duration-300
                    ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
                    hidden md:block
                    `}
                >
                    <div className="max-w-7xl mx-auto p-6 grid grid-cols-6 gap-6">

                        {/* All products */}
                        <div className="flex col-span-1 h-full items-center">
                            <Link
                                to="/shop"
                                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100"
                                onClick={closeMenu}
                            >
                                <AllProductsIcon size={20} />
                                Todos los productos
                            </Link>
                        </div>

                        {/* Categories */}
                        <div className="col-span-5 grid grid-cols-5 gap-4">
                            {categories.map(cat => {
                                const Icon = categoryIcons[cat.name] || MisceláneoIcon
                                return (
                                    <Link
                                        key={cat.name}
                                        to={`/shop/${cat.name.toLowerCase()}`}
                                        onClick={closeMenu}
                                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100"
                                    >
                                        <Icon size={20} />
                                        {cat.name}
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </header>

            <div
                onClick={() => setIsOpen(false)}
                className={`
                fixed inset-0 bg-black/60 z-40 transition-opacity
                ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
                md:hidden
        `       }
            />

            <aside
                className={`
                fixed top-0 right-0 h-full w-80 bg-gray-100 z-50
                transform transition-transform duration-300 
                ${isOpen ? "translate-x-0" : "translate-x-full"}
                md:hidden
                `}
            >
                <div className="p-4 space-y-6">


                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-right w-full text-xl"
                    >
                        ✕
                    </button>

                    <div className="bg-white rounded-md shadow-md">
                        <SearchBar />
                    </div>

                    <div className="bg-white rounded-md shadow-md p-2">

                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/shop"
                                    className="flex items-center gap-2 p-2 rounded hover:bg-gray-100"
                                >
                                    <AllProductsIcon />
                                    Todos los productos
                                </Link>
                            </li>

                            {categories.map(cat => {
                                const Icon = categoryIcons[cat.name] || MisceláneoIcon
                                return (
                                    <li key={cat.name}>
                                        <Link
                                            to={`/shop/${cat.name.toLowerCase()}`}
                                            className="flex items-center gap-2 p-2 rounded hover:bg-gray-100"
                                        >
                                            <Icon size={20} />
                                            {cat.name}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>

                    <div className="flex justify-around pt-4 border-t space-y-2">
                        {loading ? (
                            <p>Loading...</p>
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
                    </div>
                </div>
            </aside>
        </>
    )
}