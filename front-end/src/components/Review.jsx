import { useState } from "react";
import { Puntuacion } from "./Puntuacion";
import { useEffect } from "react";
import { XIcon } from "../icons/MiscIcons";

export function Review({ isOpen, onClose, product_id }) {

    const [rating, setRating] = useState(0)
    const [review, setReview] = useState("")

    const addRating = async () => {
        if (!rating) return alert("Debes seleccionar una puntuación");

        const res = await fetch("http://localhost:3000/rating/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                product_id: product_id,
                rating,
                review
            })
        });

        const data = await res.json();
        console.log("Respuesta del servidor:", data);

        if (res.ok) {
            onClose()
        }
    };

    useEffect(() => {
        const fetchRating = async () => {
            const res = await fetch(`http://localhost:3000/rating/getUser/${product_id}`, {
                method: "GET",
                credentials: "include"
            })
            const data = await res.json();
            if (data.rating) setRating(data.rating)
            if (data.review) setReview(data.review)
        };

        if (product_id) fetchRating()
    }, [product_id])

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="flex flex-col bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl">{rating ? "Editar reseña:" : "Escribe una reseña"}</h1>
                    <button
                        className="px-2 py-2 rounded-md hover:bg-gray-300"
                        onClick={onClose}
                    >
                        <XIcon />
                    </button>

                </div>

                <div className="flex flex-col gap-y-3">
                    <Puntuacion value={rating} onChange={setRating} editable={true} />

                    <textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        className="w-full border rounded-md px-3 py-2 min-h-[160px]"
                    />
                </div>
                <button
                    onClick={addRating}
                    className="rounded-lg w-full bg-yellow-500 hover:bg-yellow-300 my-2 px-4 py-2 text-white font-bold cursor-pointer"
                >
                    {rating ? "Editar Reseña" : "Enviar Reseña"}
                </button>
            </div>

        </div>
    )
}