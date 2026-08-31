export function Paginacion({ totalPages, currentPage, setCurrentPage }) {
    return (
        <div className="flex justify-center mt-2 gap-2 w-full p-2">
            {currentPage > 1 && (
                <button
                    className="px-3 py-1 border border-[rgba(0,0,0,0.1)] rounded-lg cursor-pointer font-bold hover:bg-zinc-200 transition"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}>
                    {"<<"}
                </button>
            )}

            {[...Array(totalPages)].map((_, i) => {
                const pageNumber = i + 1
                const isWithRange =
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)

                return isWithRange ? (
                    <button
                        key={i}
                        className={`w-12 p-3 border border-[rgba(0,0,0,0.1)] rounded-lg cursor-pointer shadow-lg hover:bg-zinc-200 transition ${currentPage === i + 1 ? "bg-zinc-300 text-white " : ""}`}
                        onClick={() => setCurrentPage(i + 1)}
                    >
                        {pageNumber}
                    </button>
                ) : (
                    pageNumber === currentPage - 2 || pageNumber === currentPage + 2 ? (
                        <span key={i} className="px-3 py-1">...</span>
                    ) : null
                )
            })}

            {currentPage < totalPages && (
                <button
                    className="px-3 py-1 border border-[rgba(0,0,0,0.1)] cursor-pointer hover:bg-zinc-200 transition"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}>
                    {">>"}
                </button>
            )}
        </div>
    )
}