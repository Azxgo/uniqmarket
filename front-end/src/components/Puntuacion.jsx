import { useState } from "react";
import { StarIcon } from "../icons/MiscIcons";

export function Puntuacion() {
    const [hoverIndex, setHoverIndex] = useState(0)
    const [selectedIndex, setSelectedIndex] = useState(0)

    return (
        <div className="flex my-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                    key={star}
                    size={28}
                    filled={star <= (hoverIndex || selectedIndex)} 
                    className="cursor-pointer transition-colors duration-200"
                    onMouseEnter={() => setHoverIndex(star)}
                    onMouseLeave={() => setHoverIndex(0)}
                    onClick={() => setSelectedIndex(star)}
                />
            ))}

        </div>
    )
}