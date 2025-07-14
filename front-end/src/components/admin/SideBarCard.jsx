export function SideBarCard ({title, sideNav}) {
    return (
        <div className="flex bg-zinc-800 items-center h-[60px]">

                <div className="min-w-[60px] flex justify-center">
                    <picture className="p-3 rounded-full bg-gray-600" />
                </div>

                <div
                    className={`overflow-hidden transition-all duration-300
                            ${sideNav ? "w-full opacity-100 pl-2" : "w-0 opacity-0"}`}
                >
                    <h1 className="text-white whitespace-nowrap">{title}</h1>
                </div>
            </div>
    )
}