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
    const [reviews, setReviews] = useState([])

    const [reviewOpen, setReviewOpen] = useState(false)
    const [canReview, setCanReview] = useState(false)

    const [stockLeft, setStockLeft] = useState(0);

    const REVIEWS_PER_PAGE = 2
    const [currentPage, setCurrentPage] = useState(1)

    const prod = products.find(prod => prod.product_id === Number(id));

    const fetchReviewsAndRating = async () => {
        const resAvg = await fetch(`https://uniqmarket.onrender.com/api/rating/get/${prod.product_id}`);
        const avgData = await resAvg.json();
        setAvgRating(avgData.avg_rating);

        const resReviews = await fetch(`https://uniqmarket.onrender.com/api/rating/getReviews/${prod.product_id}`);
        const reviewsData = await resReviews.json();
        setReviews(reviewsData);
    };

    useEffect(() => {
        if (prod?.name) {
            document.title = `${prod.name} - Uniqmarket`;
        }

        if (!prod) return

        const fetchReviews = async () => {
            const res = await fetch(`https://uniqmarket.onrender.com/api/rating/getReviews/${prod.product_id}`);
            const data = await res.json();
            setReviews(data);
        };

        const checkPurchase = async () => {
            const res = await fetch(`https://uniqmarket.onrender.com/api/rating/checkPurchase/${prod.product_id}`, {
                credentials: "include"
            })
            const data = await res.json();
            setCanReview(data.purchased)
        }

        fetchReviewsAndRating();
        checkPurchase();
        fetchReviews();

        const currentInCart = cartProducts.find(item => item.product.product_id === prod.product_id)?.quantity || 0;
        setStockLeft(prod.stock - currentInCart);
    }, [prod]);

    const totalPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE)

    const startIndex = (currentPage - 1) * REVIEWS_PER_PAGE
    const visibleReviews = reviews.slice(
        startIndex,
        startIndex + REVIEWS_PER_PAGE
    )


    if (loading) {
        return <SkeletonProductPage />
    }

    if (!prod) {
        return <h1>No se ha encontrado el producto</h1>
    }

    return (
        <div className="">
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-[550px_auto] gap-4">
                <div className="bg-white flex justify-center rounded-lg shadow-lg items-center">
                    <img src={prod.image_url} className="w-[450px] h-[450px] object-cover" />
                </div>
                <div className="bg-white flex flex-col w-full p-5 gap-1 rounded-lg shadow-lg">
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

            <div className="flex flex-col w-full bg-white mt-4 rounded-lg shadow-lg p-5 gap-6">
                <h1 className="font-bold text-[30px]">Reseñas</h1>

                <div className="flex flex-col gap-4 border-b border-gray-200 pb-6">
                    {reviews.length === 0 ? (
                        <p className="text-center text-gray-500 py-6">
                            No hay reviews disponibles
                        </p>
                    ) : (
                        visibleReviews.map((rev, i) => (
                            <div
                                key={i}
                                className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4 border-b border-gray-200 py-4"
                            >
                                {/* Usuario */}
                                <div className="text-sm text-gray-600">
                                    <p className="font-semibold text-lg text-gray-800">{rev.name}</p>
                                    <p className="text-md">
                                        {new Date(rev.review_date).toLocaleDateString("es-CL")}
                                    </p>
                                    <p>
                                        Comprado en:{" "}
                                        {new Date(rev.first_purchase_date).toLocaleDateString("es-CL")}
                                    </p>
                                </div>

                                {/* Contenido */}
                                <div className="flex flex-col gap-2 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <Puntuacion average={rev.rating} editable={false} />
                                        <span className="text-sm font-medium">{rev.rating}</span>
                                        <p className="font-bold text-lg">{rev.title}</p>
                                    </div>

                                    <p className="text-gray-700 leading-relaxed break-words whitespace-pre-wrap">
                                        {rev.review}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}

                    {reviews.length > REVIEWS_PER_PAGE && (
                        <div className="flex justify-end w-full items-center gap-4 mt-4">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(p => p - 1)}
                                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                            >
                                Anterior
                            </button>

                            <span className="font-medium">
                                Página {currentPage} de {totalPages}
                            </span>

                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(p => p + 1)}
                                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                            >
                                Siguiente
                            </button>
                        </div>
                    )}

                </div>
            </div>

            <Review
                isOpen={reviewOpen}
                onClose={() => setReviewOpen(false)}
                product_id={prod.product_id}
                onReviewChange={fetchReviewsAndRating}
            />

        </div >
    )
}