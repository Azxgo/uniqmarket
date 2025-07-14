import { useState } from "react"
import { Search } from "../../icons/NavBarIcons"
import { useLocation, useNavigate } from "react-router-dom"

export function SearchBar() {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = (e) => {
        e.preventDefault();

        const currentPath = location.pathname;
        const isShopRoute = currentPath.startsWith("/shop/")
        const categoryPath = isShopRoute ? currentPath : "/shop/";

        navigate(`${categoryPath}?search=${encodeURIComponent(searchTerm)}&page=1`);
    }

    return (
        <>
            <form className="flex items-center w-full max-w-[400px]" onSubmit={handleSubmit}>
                <input
                    className="flex-grow bg-white rounded-sm p-2 w-full max-w-[500px] min-w-[100px] outline-none"
                    type="text"
                    placeholder="Buscar Producto...."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit" className="bg-black p-2 rounded-md cursor-pointer hover:bg-zinc-700">
                    <Search size={26} />
                </button>
            </form>
        </>
    )
}