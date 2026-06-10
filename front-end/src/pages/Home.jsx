import { MiniBanners } from "../components/MiniBanners";
import { Slider } from "../components/Slider";
import { useData } from "../hooks/useData";
import { banners } from "../lib/banners";
import { Link } from "react-router-dom";
import { SkeletonHome } from "./skeletons/SkeletonHome";
import { useLoad } from "../hooks/useLoad";
import { Spinner } from "../components/Spinner";

export default function Home() {
    const { randomProds, isLoading } = useData();
    const { loading } = useLoad();

    if (loading) return <SkeletonHome />;

    return (
        <div className="max-w-7xl mx-auto px-4 flex flex-col gap-8">

            <Slider>
                {banners.map((banner, index) => (
                    <img key={index} src={banner.imgUrl} alt={banner.imgAlt} className=" object-cover" />
                ))}
            </Slider>

            <MiniBanners />

            <h1 className="text-base sm:text-lg md:text-2xl font-semibold text-center">
                Productos Destacados
            </h1>

            {isLoading ? (
                <div className="flex flex-col justify-center items-center h-64 gap-3">
                    <span className="text-lg font-semibold text-gray-500 animate-pulse">Cargando productos...</span>
                    <Spinner />
                </div>
            ) : (
                <div className="flex gap-4 pb-4 overflow-x-auto flex-nowrap md:grid md:grid-cols-2 md:gap-6 md:overflow-visible lg:grid-cols-4">
                    {randomProds.map((prod) => (
                        <Link key={prod.product_id} to={`/product/${prod.product_id}`} className="shrink-0 md:shrink">
                            <div className="flex flex-col w-[150px] sm:w-[180px] md:w-full bg-white border border-gray-200 rounded-lg shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg overflow-hidden">
                                <img src={prod.image_url} alt={prod.name} loading="lazy" className="w-full aspect-[4/5] sm:aspect-square object-cover" />
                                <div className="p-2 sm:p-3 flex flex-col gap-1">
                                    <span className="text-[10px] sm:text-xs text-gray-500">{prod.brand}</span>
                                    <h2 className="text-xs sm:text-sm font-semibold line-clamp-2 min-h-[2.5rem]">{prod.name}</h2>
                                    <span className="text-sm sm:text-lg font-bold">${prod.price}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            <title>Inicio - Uniqmarket</title>
        </div>
    );
}