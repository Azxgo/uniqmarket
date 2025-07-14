import { useParams } from "react-router-dom"
import { useData } from "../hooks/useData";
import { useCartContext } from "../context/cartContext";
import { SkeletonProductPage } from "./skeletons/SkeletonProductPage";
import { useLoad } from "../hooks/useLoad";
import { useEffect } from "react";

export default function ProductPage() {
    const { products } = useData()
    const { id } = useParams()
    const { addToCart } = useCartContext();

    const { loading } = useLoad()

    const prod = products.find(prod => prod.product_id === Number(id))

    useEffect(() => {
        if (prod?.name) {
            document.title = `${prod.name} - Uniqmarket`;
        } 
    }, [prod]);

    if (loading) {
        return <SkeletonProductPage />
    }

    if (!prod) {
        return <h1>No se ha encontrado el producto</h1>
    }

    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-[550px_auto] gap-4">
                <div className="bg-white flex justify-center rounded-lg shadow-lg items-center">
                    <img src={prod.image_url} className="w-[450px] h-[450px] object-cover" />
                </div>
                <div className="bg-white flex flex-col w-full p-3 gap-1 rounded-lg shadow-lg">
                    <span className="text-[22px] text-gray-400">{prod.brand}</span>
                    <h3 className="font-bold text-[34px]">{prod.name}</h3>
                    <span className="text-gray-400">SKU: {prod.sku}</span>
                    <h2 className="font-bold text-[30px]">${prod.price}</h2>
                    <p className="text-[20px]">Vendido por: {prod.vendor_name}</p>
                    <h4>XD</h4>
                    <button className="rounded-lg w-full bg-zinc-900 hover:bg-zinc-700 my-2 p-3 text-white cursor-pointer"
                        onClick={() => addToCart(prod)}
                    >
                        Agregar al carrito
                    </button>
                    <div className="flex flex-col gap-2">
                        <h3 className="font-bold text-[20px] pb-1 border-b-2 border-black">Descripción</h3>
                        <p className="text-[18px]">
                            {prod.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}