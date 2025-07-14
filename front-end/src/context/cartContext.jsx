import { createContext, useContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const useCartContext = () => {
    return useContext(CartContext)
}

export const CartProvider = ({ children }) => {
    const [cartProducts, setCartProducts] = useState([])

    useEffect(() => {
        fetch("http://localhost:3000/cart", { credentials: "include" })
            .then(res => res.json())
            .then(data => {
                // Asegúrate que data.items existe y es array
                const products = data.items?.map(item => ({
                    product: {
                        product_id: item.product_id,
                        brand: item.brand,
                        name: item.name,
                        price: item.price,
                        image_url: item.image_url,
                    },
                    quantity: item.quantity
                })) || [];
                setCartProducts(products);
            })
            .catch(() => setCartProducts([]))
    }, [])


    const addToCart = async (product) => {
        try {
            const response = await fetch("http://localhost:3000/cart/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ product_id: product.product_id, quantity: 1 })
            });

            if (!response.ok) {
                throw new Error("Error al agregar al carrito");
            }

            setCartProducts(prevCart => {
                const existingProduct = prevCart.find(
                    (item) => item.product.product_id === product.product_id
                );

                if (existingProduct) {
                    return prevCart.map(item =>
                        item.product.product_id === product.product_id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    );
                } else {
                    return [...prevCart, { product, quantity: 1 }];
                }
            });
        } catch (error) {
            console.error(error);
        }
    };

    const removeFromCart = async (product) => {
        try {
            const response = await fetch("http://localhost:3000/cart/remove", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ product_id: product.product_id })
            })

            if (!response.ok) {
                throw new Error("Error al remover del carrito");
            }

            setCartProducts(prevCart => {
                return prevCart
                    .map(item => {
                        if (item.product.product_id === product.product_id) {
                            return { ...item, quantity: item.quantity - 1 };
                        }
                        return item;
                    })
                    .filter(item => item.quantity > 0);
            })
        } catch (error) {
            console.error(error);
        }
    }

    const resetCart = async () => {
        const confirmed = window.confirm("¿Estas seguro de que deseas reinciar el carrito?")
        if (!confirmed) return

        try {
            const response = await fetch("http://localhost:3000/cart/reset", {
                method: "POST",
                credentials: "include"
            });

            const data = await response.json();

            if (!response.ok) {
                if (data?.error) {
                    alert(data.error);
                    return
                } else {
                    throw new Error("Error al resetear el carrito");
                }

            }

            setCartProducts([])
        } catch (error) {
            console.error(error)
        }
    }

    const buyProducts = async () => {
        const confirmed = window.confirm("¿Estas seguro de que deseas realizar la compra?")
        if (!confirmed) return
        try {
            const response = await fetch("http://localhost:3000/cart/buy", {
                method: "POST",
                credentials: "include"
            });

            const data = await response.json()

            if (!response.ok) {
                if (data?.message) {
                    alert(data.message)
                } else {
                    throw new Error("Error al realizar la compra")
                }
                return;
            }

            alert("¡Compra ralizada con exito!")
            setCartProducts([])
        } catch (error) {
            console.error(error);
            alert("Ocurrió un error al procesar la compra");
        }
    }

    return (
        <CartContext.Provider value={{ cartProducts, setCartProducts, addToCart, removeFromCart, resetCart, buyProducts }}>
            {children}
        </CartContext.Provider>
    )
}