import { Menu } from "../../icons/NavBarIcons"
export function Categories() {

    return (
            <div className="flex items-center gap-2 hover:bg-zinc-400 p-2 rounded-md transition cursor-pointer">
                <Menu size={40}/>
                <h3 className="text-white">Categorias</h3>
            </div>
    )
}