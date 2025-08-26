import { useState } from "react";
import { Puntuacion } from "./Puntuacion";

export function Review({ isOpen, onClose, product_id }) {

    const [rating, setRating] = useState(0)

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
                rating
            })
        });

        const data = await res.json();
        console.log("Respuesta del servidor:", data);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="flex flex-col  bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                <div className="flex">
                    <h1>prueba lol</h1>
                    <button
                        className="px-4 py-2 rounded-md hover:bg-gray-300"
                        onClick={onClose}
                    >
                        X
                    </button>

                </div>
                <Puntuacion onChange={setRating} editable={true} />
                <button
                    onClick={addRating}
                    className="rounded-lg w-full bg-yellow-500 hover:bg-yellow-300 my-2 px-4 py-2 text-white font-bold cursor-pointer"
                >
                    Enviar Puntuación
                </button>
            </div>

        </div>
    )
}