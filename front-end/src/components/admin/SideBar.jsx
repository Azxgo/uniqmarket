import { Link } from "react-router-dom";
import { SideBarCard } from "./SideBarCard";

export function SideBar({ sideNav, OpenSideNav }) {
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
                        className="p-3 rounded-full bg-gray-600 transition-all"
                        onClick={() => OpenSideNav(!sideNav)}
                    >
                    </button>
                </div>
            </div>
            <Link to={"/admin"}>
                <SideBarCard title={"Inicio"} sideNav={sideNav} />
            </Link>
            <Link to={"/admin/products"}>
                <SideBarCard title={"Productos"} sideNav={sideNav} />
            </Link>
            <Link to={"/admin/orders"}>
                <SideBarCard title={"Ordenes"} sideNav={sideNav} />
            </Link>
            <Link to={"/admin/users"}>
                <SideBarCard title={"Usuarios"} sideNav={sideNav} />
            </Link>
            <Link to={"/admin/categories"}>
                <SideBarCard title={"Categorias"} sideNav={sideNav} />
            </Link>
        </div>
    )
}