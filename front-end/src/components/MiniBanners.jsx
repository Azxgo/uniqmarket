import { minibanners } from "../lib/minibanners";
import { Link } from "react-router-dom";

export function MiniBanners() {
    return (
        <div className="w-full flex gap-4">
            {minibanners.slice(0, 3).map((minibanner, index) => {
                let href = "#";
                if (index === 0) href = "/shop/música";
                else if (index === 1) href = "/shop/mascotas";
                else if (index === 2) href = "/shop/tecnología";

                return (
                    <Link
                        key={index}
                        to={href}
                        className="w-1/3 aspect-[4/2] sm:aspect-[4/2] md:aspect-[6/2] rounded-lg
                            overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
                    >
                        <img
                            src={minibanner.imgUrl}
                            alt={minibanner.imgAlt}
                            loading="lazy"
                            className="w-full h-full object-cover
                                transition-transform duration-300 hover:scale-105"
                        />
                    </Link>
                );
            })}
        </div>
    );
}