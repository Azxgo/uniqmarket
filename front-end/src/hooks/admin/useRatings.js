import { useEffect, useState } from "react"

export function useRatings() {
    const [rating, setRating] = useState([])

    const fetchAllRatings = async () => {
        try {
            const res = await fetch("http://localhost:3000/rating/getAll", {
                credentials: "include"
            })
            const rat = await res.json();

            setRating(rat);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    }

    useEffect(() => {
        fetchAllRatings()
    }, [])

    return { rating, setRating }
}