import { useEffect, useRef, useState } from "react";
import { User2Icon, UserIcon } from "../../icons/AdminIcons";
import { Link } from "react-router-dom";
import { LoginIcon, LogoutIcon, RegisterIcon } from "../../icons/NavBarIcons";

export function UserMenu({ user, loading, logout }) {
    const [open, setOpen] = useState(false)
    const ref = useRef(null)

    useEffect(() => {
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handler)
        return () => document.removeEventListener("mousedown", handler)
    }, [])

    return (
        <div ref={ref} className="relative hidden md:block">

            <button
                onClick={() => setOpen(!open)}
                className="flex items-center justify-center w-[66px] h-[66px]
                            rounded-lg hover:bg-zinc-400 transition-colors cursor-pointer"
                aria-label="Menú de usuario"
            >
                <User2Icon size={45} color={"white"} />
            </button>

            <div
                className={`
                absolute left-1/2 -translate-x-1/2 top-full w-42 mt-2 bg-white rounded-md shadow-lg transition-all duration-200
                ${open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
                `}
            >
                {loading ? (
                    <p className="p-4 text-sm">Loading...</p>
                ) : user ? (
                    <ul className="text-sm">
                        <li className="px-4 py-2 text-gray-500 flex items-center justify-left gap-2 px-4 py-2.5 text-lg text-gray-700
                                 hover:bg-gray-100 transition-colors">
                             <UserIcon/>       
                            {user.username}
                        </li>

                        <li>
                            <button
                                onClick={logout}
                                className="flex items-center gap-2 px-4 py-2.5 text-lg justify-left text-gray-700
                                 hover:bg-gray-100 transition-colors w-full cursor-pointer"
                            >
                                <LogoutIcon/>
                                <p className="w-full">Cerrar sesión</p>
                            </button>
                        </li>
                    </ul>
                ) : (
                    <ul className="text-sm">
                        <li>
                            <Link
                                to="/login"
                                className="flex items-center gap-2 px-4 py-2.5 text-lg text-gray-700
                                 hover:bg-gray-100 transition-colors"
                            >
                                <LoginIcon/>
                                <p>Iniciar sesión</p>
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/register"
                                className="flex items-center gap-2 px-4 py-2.5 text-lg text-gray-700
                                 hover:bg-gray-100 transition-colors"
                            > 
                                <RegisterIcon/>
                                <p>Registrarse</p>
                            </Link>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    )
};
