import { Link, NavLink } from "react-router-dom";
import { SideBarCard } from "./SideBarCard";
import { CategoryIcon, ElipsisIcon, ExpandIcon, LayoutIcon, LogoutIcon, OrderIcon, ProductIcon, UserIcon } from "../../icons/AdminIcons";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuthContext } from "../../context/authContext";

export function SideBar({ sideNav, OpenSideNav }) {
    const { user, logout } = useAuthContext()
    const [open, setOpen] = useState(false);

    return (
        <div
            className={`fixed flex flex-col top-0 left-0 pt-[50px] h-screen bg-zinc-800 z-40 transition-all duration-300
                    ${sideNav ? "w-[260px]" : "w-[60px]"}`}
        >
            <div className="flex bg-zinc-800 items-center h-[60px]">
                <div
                    className={`overflow-hidden transition-all duration-300
                            ${sideNav ? "w-full opacity-100 pl-2" : "w-0 opacity-0"}`}
                >
                    <h1 className="text-white whitespace-nowrap">Uniqmarket</h1>
                </div>

                <div className="min-w-[60px] flex justify-center">
                    <button
                        className="p-3 rounded-full transition-all"
                        onClick={() => OpenSideNav(!sideNav)}
                    >
                        <ExpandIcon color={"white"} />
                    </button>
                </div>
            </div>
            <NavLink
                to="/admin"
                end
                className={({ isActive }) =>
                    `block transition-colors ${isActive ? "bg-zinc-700" : "hover:bg-zinc-700"
                    }`
                }
            >
                <SideBarCard icon={<LayoutIcon color="white" />} title="Inicio" sideNav={sideNav} />
            </NavLink>
            <NavLink
                to="/admin/products"
                className={({ isActive }) =>
                    `block transition-colors ${isActive ? "bg-zinc-700" : "hover:bg-zinc-700"
                    }`
                }
            >
                <SideBarCard icon={<ProductIcon color={"white"} />} title={"Productos"} sideNav={sideNav} />
            </NavLink>
            <NavLink
                to="/admin/orders"
                className={({ isActive }) =>
                    `block transition-colors ${isActive ? "bg-zinc-700" : "hover:bg-zinc-700"
                    }`
                }
            >
                <SideBarCard icon={<OrderIcon color={"white"} />} title={"Ordenes"} sideNav={sideNav} />
            </NavLink>
            <NavLink
                to="/admin/users"
                className={({ isActive }) =>
                    `block transition-colors ${isActive ? "bg-zinc-700" : "hover:bg-zinc-700"
                    }`
                }
            >
                <SideBarCard icon={<UserIcon color={"white"} />} title={"Usuarios"} sideNav={sideNav} />
            </NavLink>
            <NavLink
                to="/admin/categories"
                className={({ isActive }) =>
                    `block transition-colors ${isActive ? "bg-zinc-700" : "hover:bg-zinc-700"
                    }`
                }
            >
                <SideBarCard icon={<CategoryIcon color={"white"} />} title={"Categorias"} sideNav={sideNav} />
            </NavLink>

            <div className="flex bg-zinc-800 items-center h-[60px] mt-auto">
                <div className="min-w-[60px] flex justify-center">
                    <picture className="p-5 rounded-full bg-gray-600" />
                </div>
                <div
                    className={`overflow-hidden transition-all duration-300
                            ${sideNav ? "w-full opacity-100 pl-2" : "w-0 opacity-0"}`}
                >
                    <div className="flex justify-between p-2">
                        <h1 className="text-white whitespace-nowrap">{user?.username}</h1>
                        <button
                            className="cursor-pointer"
                            onClick={() => setOpen(!open)}>
                            <ElipsisIcon color={"white"} />
                        </button>
                    </div>
                </div>
            </div>


            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-[60px] left-0 w-full hover:bg-gray-600 transition-colors z-50 cursor-pointer"
                    >
                        <button
                            className="flex items-start cursor-pointer"
                            onClick={logout}>
                            <SideBarCard icon={<LogoutIcon color="white" />} title="Cerrar Sesión" sideNav={sideNav} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}