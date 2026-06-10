export function SkeletonHome() {
    return (
        <div className="max-w-7xl mx-auto px-4 flex flex-col gap-8 animate-pulse">

            <div className="w-full h-[180px] sm:h-[220px] md:h-[280px] lg:h-[320px] bg-gray-300 rounded-xl" />

            <div className="flex gap-3">
                <div className="flex-1 h-[70px] sm:h-[90px] bg-gray-300 rounded-lg" />
                <div className="flex-1 h-[70px] sm:h-[90px] bg-gray-300 rounded-lg" />
                <div className="flex-1 h-[70px] sm:h-[90px] bg-gray-300 rounded-lg" />
            </div>

            <div className="h-5 sm:h-6 md:h-8 w-40 sm:w-56 md:w-72 bg-gray-300 rounded mx-auto" />

            <div className="flex gap-4 pb-4 overflow-x-hidden md:grid md:grid-cols-2 md:gap-6 lg:grid-cols-4">

                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex flex-col w-[150px] sm:w-[180px] md:w-full bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">

                        <div className="w-full aspect-[4/5] sm:aspect-square bg-gray-300" />

                        <div className="p-2 sm:p-3 flex flex-col gap-2">
                            <div className="h-3 w-1/3 bg-gray-300 rounded" />
                            <div className="h-4 w-full bg-gray-300 rounded" />
                            <div className="h-4 w-5/6 bg-gray-300 rounded" />
                            <div className="h-5 w-1/2 bg-gray-300 rounded mt-1" />
                        </div>

                    </div>
                ))}

            </div>

            <title>Inicio - Uniqmarket</title>
        </div>
    );
}