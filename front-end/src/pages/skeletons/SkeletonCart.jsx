export function SkeletonCart() {
    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-[auto_400px] gap-8 items-start">
                <div className="flex flex-col bg-white rounded-md shadow-md p-5">
                    <div className="border-b-2 border-gray-300 w-full pb-2">
                        <div className="h-8 bg-gray-300 w-1/7"></div>
                    </div>
                    <div className="h-100">

                    </div>
                </div>
                <div className="flex flex-col bg-white rounded-md shadow-md p-5 ">
                    <div className="font-bold text-2xl border-b-2 border-gray-300 w-full pb-2">
                        <div className="h-8 bg-gray-300 w-2/4 rounded-md"></div>
                    </div>
                    <div className="flex flex-col justify-between pt-2 gap-2 pb-2 border-b-2 border-gray-300">
                        <div className="h-6 bg-gray-300 w-full rounded-md"></div>
                        <div className="h-6 bg-gray-300 w-full rounded-md"></div>
                    </div>
                    <div className="flex flex-col py-3 gap-2">
                        <div className="h-10 bg-gray-300 w-full rounded-md"></div>
                        <div className="h-10 bg-gray-300 w-full rounded-md"></div>
                    </div>
                </div>
            </div>
            <title>Carrito - Uniqmarket</title>
        </div>
    )
}