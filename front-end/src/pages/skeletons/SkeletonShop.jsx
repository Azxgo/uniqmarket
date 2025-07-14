export function SkeletonShop() {
    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-[290px_auto] gap-6">
                <div>
                    <div className="flex flex-col items-center text-center rounded-md shadow-md p-5 bg-white">
                        <div className="flex border-b-2 border-gray-300 w-full pb-4 mb-3 items-center justify-center">
                            <div className="flex h-8 bg-gray-300 w-1/3 rounded-lg"></div>
                        </div>
                        <div className="w-full border-b-1 border-gray-300 pb-3 mb-3">
                            <div className="flex h-11 bg-gray-300 w-full rounded-md"></div>
                        </div>
                        <div className="w-full border-b-1 border-gray-300 pb-3">
                            <div className="flex h-11 bg-gray-300 w-full rounded-md"></div>
                        </div>
                        <div className="flex flex-col w-full mt-4 gap-4">
                            <div className="flex h-11 bg-gray-300 w-full rounded-md"></div>
                        </div>
                    </div>
                </div>

                <main className="flex flex-col rounded-md shadow-md p-2 bg-white">
                    <div className="flex bg-gray-200 w-full items-center justify-end h-[40px] rounded-md">
                        <div className="mx-2 bg-white"></div>
                    </div>
                    <div className="flex flex-wrap gap-7 justify-center mt-2 py-2">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div className="flex flex-col max-w-[250px] h-full max-h-[400px] border border-gray-300 shadow-md rounded-lg overflow-hidden"
                            key={i}>
                                <div className="w-52 h-52 bg-gray-300 object-cover mx-auto">
                                    <div className="w-full h-full mx-auto"></div>
                                </div>
                                <div className="flex flex-col p-3 w-full max-w-[208px] gap-2">
                                    <div className="h-5 bg-gray-300 w-1/2 rounded-lg"></div>
                                    <div className="h-[115px] bg-gray-300 w-2/2 line-clamp-5  rounded-lg"></div>
                                    <div className="h-6 bg-gray-300 w-1/3 rounded-lg" ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center mt-2 gap-2 w-full p-2">
                        <div className="h-13 w-12 p-3 bg-gray-300 border border-[rgba(0,0,0,0.1)] rounded-lg shadow-lg"></div>
                        <div className="h-13 w-12 p-3 bg-gray-300 border border-[rgba(0,0,0,0.1)] rounded-lg shadow-lg"></div>
                        <div className="h-13 w-12 p-3 bg-gray-300 border border-[rgba(0,0,0,0.1)] rounded-lg shadow-lg"></div>
                    </div>
                </main>
            </div>
            <title>Tienda - Uniqmarket</title>
        </div>
    )
}