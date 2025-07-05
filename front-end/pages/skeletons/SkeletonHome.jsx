export function SkeletonHome() {
    return (
        <div className="flex flex-col justify-center gap-6 animate-pulse items-center w-full">
            <div className="flex w-full max-w-[1250px] h-[350px] bg-gray-300 rounded-xl">
                <div className="relative w-full h-full flex transition-transform duration-500 ease-in-out">
                </div>
            </div>
            <div className="flex flex-wrap w-full max-w-[1250px] justify-between sm:gap-5">
                <div className="w-full max-w-[380px] h-[100px] bg-gray-300 rounded-lg block overflow-hidden"></div>
                <div className="w-full max-w-[380px] h-[100px] bg-gray-300 rounded-lg block overflow-hidden"></div>
                <div className="w-full max-w-[380px] h-[100px] bg-gray-300 rounded-lg block overflow-hidden"></div>
            </div>
            <div className="flex h-9 bg-gray-300 rounded w-1/6 justify-center"></div>
            <div className="flex bg-white rounded-lg shadow-lg gap-10 p-4">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div className="flex flex-col w-full max-w-[250px] h-full max-h-[400px] border border-gray-300 shadow-md rounded-lg overflow-hidden"
                    key={i}>
                        <div className="w-52 h-52 bg-gray-300 object-cover mx-auto">
                            <div className="w-full h-full"></div>
                        </div>
                        <div className="flex flex-col p-3 w-full max-w-[208px] gap-2">
                            <div className="h-5 bg-gray-300 w-1/2 rounded-lg"></div>
                            <div className="h-8 bg-gray-300 w-2/2 line-clamp-5 rounded-lg"></div>
                            <div className="h-6 bg-gray-300 w-1/3 mt-8 rounded-lg" ></div>
                        </div>
                    </div>
                ))}
            </div>
            <title>Inicio - Uniqmarket</title>
        </div>
    )
}