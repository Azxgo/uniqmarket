import { useState } from "react";
import { StarIcon } from "../icons/MiscIcons";
import { useEffect } from "react";

export function Puntuacion({ value = 0, onChange, average = 0, editable = false, size = 25 }) {
    const [hoverIndex, setHoverIndex] = useState(0)
    const [selectedIndex, setSelectedIndex] = useState(0)

    useEffect(() => {
        setSelectedIndex(value);
    }, [value]);

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
                    size={size}
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