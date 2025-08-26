import { useState } from "react";
import { StarIcon } from "../icons/MiscIcons";

export function Puntuacion({ onChange, average = 0, editable = false }) {
    const [hoverIndex, setHoverIndex] = useState(0)
    const [selectedIndex, setSelectedIndex] = useState(0)

    const handleClick = (star) => {
        if (!editable) return
        setSelectedIndex(star);
        if (onChange) onChange(star)
    }

    const displayIndex = editable
        ? (hoverIndex || selectedIndex)
        : average

    return (
        <div className="flex my-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                    key={star}
                    size={28}
                    filled={star <= displayIndex}
                    className={`transition-colors duration-200 ${editable ? "cursor-pointer" : ""}`}
                    onMouseEnter={() => editable && setHoverIndex(star)}
                    onMouseLeave={() => editable && setHoverIndex(0)}
                    onClick={() => handleClick(star)}
                />
            ))}
        </div>
    )
}