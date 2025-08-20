export function SideBarCard({ icon, title, sideNav, className = "" }) {
  return (
    <div
      className={`flex items-center h-[60px] transition-colors ${className} hover:bg-gray-600 w-full`}
    >
      <div className="min-w-[60px] flex justify-center">
        {icon}
      </div>

      <div
        className={`overflow-hidden transition-all duration-300
          ${sideNav ? "w-full opacity-100 pl-2" : "w-0 opacity-0"}`}
      >
        <h1 className="text-white whitespace-nowrap">{title}</h1>
      </div>
    </div>
  );
}