import { useState } from "react";
import { LeftArrow, RightArrow } from "../icons/NavBarIcons";

export function Slider({ children }) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleNext = () => setSelectedIndex(prev => (prev < children.length - 1 ? prev + 1 : 0));
    const handlePrev = () => setSelectedIndex(prev => (prev > 0 ? prev - 1 : children.length - 1));

    return (
        <div className="relative w-full max-w-7xl mx-auto overflow-hidden rounded-xl bg-zinc-400 h-[180px] sm:h-[220px] md:h-[280px] lg:h-[320px]">
            <div className="flex h-full transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${selectedIndex * 100}%)` }}>
                {children.map((child, index) => {
                    let href = "#";
                    if (index === 0) href = "/shop/música";
                    else if (index === 1) href = "/shop/mascotas";
                    else if (index === 2) href = "/shop/tecnología";

                    return (
                        <a key={index} href={href} className="w-full h-full flex-shrink-0">
                            <div className="w-full h-full">{child}</div>
                        </a>
                    );
                })}
            </div>

            <button onClick={handlePrev} className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/80 p-2 md:p-3 rounded-full hover:bg-white transition">
                <LeftArrow />
            </button>

            <button onClick={handleNext} className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/80 p-2 md:p-3 rounded-full hover:bg-white transition">
                <RightArrow />
            </button>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {children.map((_, index) => (
                    <button key={index} onClick={() => setSelectedIndex(index)} className={`w-2.5 h-2.5 rounded-full transition ${index === selectedIndex ? "bg-gray-700" : "bg-gray-300"}`} />
                ))}
            </div>
        </div>
    );
}