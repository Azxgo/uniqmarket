import { useState } from "react";
import { Outlet } from "react-router-dom";
import { SideBar } from "../components/admin/SideBar";
import { AdminTitleProvider, useAdminTitle } from "../context/admin/AdminTitleContext";

function AdminLayoutContent({ sideNav, OpenSideNav }) {
    const { title } = useAdminTitle()

    return (
        <div>
            <header>
                <div className="fixed top-0 left-0 w-full h-[50px] bg-zinc-900 z-50" />
                <SideBar sideNav={sideNav} OpenSideNav={OpenSideNav} />
            </header>
            <main
                className={`pt-[50px] transition-all duration-300 bg-gray-100 min-h-screen
                ${sideNav ? "ml-[260px]" : "ml-[60px]"}`}
            >
                <div className="flex flex-col h-full w-full p-4 gap-6">
                    <div className="flex items-center gap-4">
                        <div className="h-14 w-14 m rounded-full bg-gray-800"></div>
                        <h1 className="text-3xl">{title}</h1>
                    </div>
                </div>
                <div className="mx-5 my-1">
                    <Outlet />
                </div>
            </main>

            <footer />
        </div>
    )
}

export function AdminLayout() {
    const [sideNav, OpenSideNav] = useState(true);
    return (
        <AdminTitleProvider>
            <AdminLayoutContent sideNav={sideNav} OpenSideNav={OpenSideNav} />
        </AdminTitleProvider>
    );
}