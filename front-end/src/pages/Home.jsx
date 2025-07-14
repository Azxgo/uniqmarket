import { MiniBanners } from "../components/MiniBanners";
import { Slider } from "../components/Slider";
import { useData } from "../hooks/useData";
import { banners } from "../lib/banners";
import { Link } from "react-router-dom";
import { SkeletonHome } from "./skeletons/SkeletonHome";
import { useLoad } from "../hooks/useLoad";

export default function Home() {
    const { randomProds } = useData()

    const { loading } = useLoad()

    if (loading) {
        return <SkeletonHome />
    }

    return (
        <div className="flex flex-col justify-center gap-6">
            <Slider>
                {banners.map((banner, index) => {
                    return (<img key={index} src={banner.imgUrl} alt={banner.imgAlt} />)
                })}
            </Slider>

            <MiniBanners />

            <h1 className="flex text-2xl justify-center">Productos Destacados</h1>

            <div className="flex bg-white rounded-lg shadow-lg gap-8 p-3">

                {randomProds.map((prod) => (
                    <Link key={prod.product_id} to={`/product/${prod.product_id}`} className="cursor-pointer w-full">
                        <div
                            className="flex flex-col w-full max-w-[250px] h-full max-h-[400px] border border-gray-300 shadow-md rounded-lg transition-transform duration-200 
                            hover:-translate-y-1 hover:shadow-lg overflow-hidden"
                        >
                            <img
                                className="w-52 h-52 object-cover mx-auto"
                                src={prod.image_url}
                                alt={prod.name}
                            />
                            <div className="p-3 w-full max-w-[208px]">
                                <span className="text-gray-500">{prod.brand}</span>
                                <h2 className="h-[80px] text-ellipsis line-clamp-5 font-bold">{prod.name}</h2>
                                <span className="font-semibold text-lg">{prod.price}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <title>Inicio - Uniqmarket</title>
        </div>
    )
}