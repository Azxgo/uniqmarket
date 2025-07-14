import { useState } from "react";
import { Outlet } from "react-router-dom";
import { SideBar } from "../components/admin/SideBar";

export function AdminLayout() {
const [sideNav, OpenSideNav] = useState(true);
    return (
        <div>
            <header>
                <div className="fixed top-0 left-0 w-full h-[50px] bg-zinc-900 z-50" />
                <SideBar sideNav={sideNav} OpenSideNav={OpenSideNav}/>
            </header>
            <main
                className={`pt-[50px] transition-all duration-300 bg-gray-100 min-h-screen
                ${sideNav ? "ml-[260px]" : "ml-[60px]"}`}
            >
                <Outlet />
            </main>

            <footer />
        </div>
    );
}