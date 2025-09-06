import { useParams } from "react-router-dom"
import { useData } from "../hooks/useData";
import { useCartContext } from "../context/cartContext";
import { SkeletonProductPage } from "./skeletons/SkeletonProductPage";
import { useLoad } from "../hooks/useLoad";
import { useEffect, useState } from "react";
import { Puntuacion } from "../components/Puntuacion";
import { Review } from "../components/Review";

export default function ProductPage() {
    const { products } = useData()
    const { id } = useParams()
    const { addToCart, cartProducts } = useCartContext();

    const { loading } = useLoad()

    const [avgRating, setAvgRating] = useState(0)

    const [reviewOpen, setReviewOpen] = useState(false)
    const [canReview, setCanReview] = useState(false)

    const [stockLeft, setStockLeft] = useState(0);

    const prod = products.find(prod => prod.product_id === Number(id));

    useEffect(() => {
        if (prod?.name) {
            document.title = `${prod.name} - Uniqmarket`;
        }

        if (!prod) return

        const fetchAvgRating = async () => {
            const res = await fetch(`http://localhost:3000/rating/get/${prod.product_id}`);
            const data = await res.json();
            setAvgRating(data.avg_rating);
        };

        const checkPurchase = async () => {
            const res = await fetch(`http://localhost:3000/rating/checkPurchase/${prod.product_id}`, {
                credentials: "include"
            })
            const data = await res.json();
            setCanReview(data.purchased)
        }

        fetchAvgRating();
        checkPurchase();

        const currentInCart = cartProducts.find(item => item.product.product_id === prod.product_id)?.quantity || 0;
        setStockLeft(prod.stock - currentInCart);
    }, [prod]);

    if (loading) {
        return <SkeletonProductPage />
    }

    if (!prod) {
        return <h1>No se ha encontrado el producto</h1>
    }


    console.log("left", stockLeft)
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

                    <div className="flex items-center gap-2">
                        <Puntuacion average={avgRating} editable={false} /> <span>{avgRating}</span>
                    </div>

                    <div className="flex gap-2">
                        {prod.stock > 0 ? (
                            <button
                                className="rounded-lg w-full bg-zinc-900 hover:bg-zinc-700 my-2 p-3 text-white font-bold cursor-pointer"
                                onClick={() => {
                                    if (stockLeft <= 0) {
                                        alert(`Ya no puedes agregar más unidades.`);
                                        return;
                                    }
                                    addToCart({
                                        product_id: prod.product_id,
                                        brand: prod.brand,
                                        name: prod.name,
                                        price: prod.price,
                                        image_url: prod.image_url,
                                        quantity: 1
                                    });
                                    setStockLeft(prev => prev - 1)

                                }}
                            >
                                Agregar al carrito
                            </button>
                        ) :
                            (
                                <button
                                    disabled
                                    className="rounded-lg w-full bg-zinc-900 hover:bg-zinc-700 my-2 p-3 text-white font-bold opacity-50"
                                >
                                    Producto Agotado
                                </button>
                            )}

                        <button
                            onClick={() => {
                                if (canReview) {
                                    setReviewOpen(!reviewOpen)
                                } else {
                                    alert("Solo puedes escribir reseñas de productos que has comprado");
                                }
                            }}
                            className="rounded-lg w-full bg-yellow-500 hover:bg-yellow-300 my-2 px-4 py-2 text-white font-bold cursor-pointer"
                        >
                            Escribir reseña
                        </button>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="font-bold text-[20px] pb-1 border-b-2 border-black">Descripción</h3>
                        <p className="text-[18px]">
                            {prod.description}
                        </p>
                    </div>
                </div>
            </div>

            <Review
                isOpen={reviewOpen}
                onClose={() => setReviewOpen(false)}
                product_id={prod.product_id}
            />

        </div >
    )
}