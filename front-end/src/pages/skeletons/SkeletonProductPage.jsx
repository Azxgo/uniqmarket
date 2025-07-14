export function SkeletonProductPage() {
    return (
        <div className="container mx-auto animate-pulse">
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-[550px_auto] gap-4">
                <div className="bg-white flex justify-center rounded-lg shadow-lg items-center">
                    <picture className="h-[450px] w-[450px]" />
                </div>
                <div className="bg-white flex flex-col w-full px-3 py-4 gap-3 rounded-lg shadow-lg">
                    <div className="h-6 bg-gray-300 rounded w-1/3" />
                    <div className="h-10 bg-gray-300 rounded w-3/3" />
                    <div className="h-6 bg-gray-300 rounded w-1/4" />
                    <div className="h-8 bg-gray-300 rounded w-1/3" />
                    <div className="h-6 bg-gray-300 rounded w-1/2" />
                    <div className="h-4 bg-gray-300 rounded w-1/5" />
                    <div className="h-12 bg-gray-300 rounded w-full my-1" />
                    <div className="flex flex-col gap-3 my-1">
                        <div className="h-6 bg-gray-300 rounded w-1/3" />
                        <div className="h-4 bg-gray-300 rounded w-full" />
                        <div className="h-4 bg-gray-300 rounded w-5/6" />
                        <div className="h-4 bg-gray-300 rounded w-3/4" />
                    </div>
                </div>
            </div>
        </div>
    )
}