import { useState } from "react";
import { LeftArrow, RightArrow } from "../icons/NavBarIcons";

export function Slider({ children }) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleNext = () => {
        setSelectedIndex((prevIndex) => (prevIndex < children.length - 1 ? prevIndex + 1 : 0))
    }

    const handlePrev = () => {
        setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : children.length - 1))
    }

    return (
        <div className="flex bg-zinc-400 w-full max-w-[1250px] min-w-[350px] rounded-xl overflow-hidden relative">
            <div className="relative w-full h-full flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${selectedIndex * 100}%)` }}
            >
                {children.map((child, index) => {
                    let href = "#";
                    if (index === 0) href = "/shop/música";
                    else if (index === 1) href = "/shop/mascotas";
                    else if (index === 2) href = "/shop/tecnología";
                    return (
                        <a key={index} href={href} className="w-full flex-shrink-0">
                            {child}
                        </a>
                    )
                })}
            </div>

            <button className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white p-3 rounded-full
             opacity-70 hover:opacity-100 transition-all duration-300 ease-in-out cursor-pointer"
                onClick={handlePrev}>
                {<LeftArrow />}
            </button>

            <button className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-3 rounded-full
             opacity-70 hover:opacity-100 transition-all duration-300 ease-in-out cursor-pointer"
                onClick={handleNext}>
                {<RightArrow />}
            </button>

            <div className="absolute bottom-0 left-1/2 -translate-1/2 flex gap-2" >
                {children.map((_, index) => (
                    <button
                        key={index}
                        className={`w-3 h-3 rounded-full cursor-pointer opacity-70 hover:opacity-100
                            transition-all duration-300 ease-in-out  ${index === selectedIndex ? "bg-gray-500" : "bg-gray-300"}`}
                        onClick={() => setSelectedIndex(index)}
                    />
                ))}
            </div>
        </div>
    )
}