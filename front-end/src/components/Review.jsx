import { useState } from "react";
import { Puntuacion } from "./Puntuacion";
import { useEffect } from "react";
import { TrashIcon, XIcon } from "../icons/MiscIcons";


export function Review({ isOpen, onClose, product_id, onReviewChange }) {

    const [rating, setRating] = useState(0)
    const [title, setTitle] = useState("")
    const [review, setReview] = useState("")

    const [hasReview, setHasReview] = useState(false)

    const addRating = async () => {
        if (!rating) return alert("Debes seleccionar una puntuación");

        const res = await fetch("https://uniqmarket.onrender.com/api/rating/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                product_id: product_id,
                rating,
                title,
                review
            })
        });

        const data = await res.json();
        console.log("Respuesta del servidor:", data);

        if (res.ok) {
            setHasReview(true)
            onReviewChange();
            onClose()
        }
    };

    useEffect(() => {
        const fetchRating = async () => {
            const res = await fetch(`https://uniqmarket.onrender.com/api/rating/getUser/${product_id}`, {
                method: "GET",
                credentials: "include"
            })
            const data = await res.json();

            if (data.rating) {
                setRating(data.rating);
                setHasReview(true);
            }

            if (data.title) setTitle(data.title)
            if (data.review) setReview(data.review)
        };

        if (product_id) fetchRating()
    }, [product_id])

    const deleteReview = async () => {
        const confirmDelete = confirm("¿Seguro que quieres eliminar tu reseña?");
        if (!confirmDelete) return;

        const res = await fetch(`https://uniqmarket.onrender.com/api/rating/delete/${product_id}`, {
            method: "DELETE",
            credentials: "include"
        });

        if (res.ok) {
            setRating(0);
            setTitle("");
            setReview("");
            onReviewChange();
            setHasReview(false);
            onClose();
        } else {
            alert("Error al eliminar la reseña");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="flex flex-col bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl">{hasReview ? "Editar reseña:" : "Escribe una reseña"}</h1>
                    <button
                        className="px-2 py-2 rounded-md hover:bg-gray-300"
                        onClick={onClose}
                    >
                        <XIcon />
                    </button>

                </div>

                <div className="flex flex-col gap-y-2">
                    <Puntuacion value={rating} onChange={setRating} editable={true} />
                    <label className="text-semibold">
                        Titulo
                    </label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border rounded-md px-3 py-2"
                    />

                    <label className="text-semibold">
                        Reseña
                    </label>
                    <textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        className="w-full border rounded-md px-3 py-2 min-h-[160px] mb-4"
                    />
                </div>

                <div className="flex items-center gap-x-2 mt-2">
                    <button
                        onClick={addRating}
                        className="flex-1 rounded-lg w-full bg-yellow-500 hover:bg-yellow-300 my-2 px-4 py-2 text-white font-bold cursor-pointer"
                    >
                        {hasReview ? "Editar Reseña" : "Enviar Reseña"}
                    </button>

                    {hasReview && (
                        <button
                            onClick={deleteReview}
                            className="p-2 rounded-lg bg-red-500 hover:bg-red-300 text-white cursor-pointer"
                            title="Eliminar reseña"
                        >
                            <TrashIcon />
                        </button>
                    )}
                </div>
            </div>

        </div>
    )
}