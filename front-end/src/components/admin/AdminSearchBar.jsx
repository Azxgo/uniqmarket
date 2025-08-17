export function AdminSearchBar({ searchTerm, onChange, placeholder = "Buscar..." }) {

    return (
        <form className="flex items-center w-full max-w-[400px]" >
            <input
                className="flex-grow bg-white rounded-sm p-2 w-full max-w-[500px] min-w-[100px] outline-none"
                type="text"
                placeholder={placeholder}
                value={searchTerm}
                onChange={(e) => onChange(e.target.value)}
            />
        </form>
    )
}