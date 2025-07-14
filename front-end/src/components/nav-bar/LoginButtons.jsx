export function LoginButtons({children, onClick }) {
    return (
        <>
            <button onClick={onClick} className="bg-zinc-900 hover:bg-zinc-700 text-white rounded-md p-1 w-[120px] h-[50px] cursor-pointer">
                {children}
            </button>
        </>
    )
}