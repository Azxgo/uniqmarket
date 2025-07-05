import { minibanners } from "../lib/minibanners";

export function MiniBanners() {
    return (
        <div className="flex flex-wrap w-full justify-between sm:gap-5">
            {
                minibanners.map((minibanner, index) => {
                    let href = "#";
                    if (index === 0) href = "/shop/música";
                    else if (index === 1) href = "/shop/mascotas";
                    else if (index === 2) href = "/shop/tecnología";

                    return (
                        <a
                            key={index}
                            href={href}
                            className="w-full max-w-[380px] h-[100px] rounded-lg block overflow-hidden 
                            transform transition-transform duration-300 hover:scale-105"
                        >
                            <img
                                src={minibanner.imgUrl}
                                alt={minibanner.imgAlt}
                                className="w-full h-full rounded-lg"
                            />
                        </a>
                    );
                })
            }
        </div>
    );
}