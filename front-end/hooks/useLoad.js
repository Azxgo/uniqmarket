import { useEffect, useState } from "react";

export function useLoad(delay = 1000) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleLoad = () => {
            const timer = setTimeout(() => {
                setLoading(false);
            }, 1000);

            return () => clearTimeout(timer);
        };

        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
        }

        return () => {
            window.removeEventListener("load", handleLoad);
        };
    }, [delay]);

    return { loading }
}