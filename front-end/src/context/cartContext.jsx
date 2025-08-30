import { createContext, useContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const useCartContext = () => {
    return useContext(CartContext)
}

export const CartProvider = ({ children }) => {
    const [cartProducts, setCartProducts] = useState([])

    const fetchCart = async () => {
        try {
            const res = await fetch("http://localhost:3000/cart", { credentials: "include" });
            const data = await res.json();
            setCartProducts(data.cartItems.map(item => ({
                product: {
                    product_id: item.product_id,
                    brand: item.brand,
                    name: item.name,
                    price: item.price,
                    image_url: item.image_url
                },
                quantity: item.quantity
            })));
        } catch {
            setCartProducts([]);
        }
    };

    useEffect(() => { fetchCart(); }, []);

    const addToCart = async (product) => {
        try {
            const res = await fetch("http://localhost:3000/cart/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ product_id: product.product_id, quantity: 1 })
            });

            if (!res.ok) {
                throw new Error("Error al agregar al carrito");
            }

            const data = await res.json()

            setCartProducts(data.cartItems.map(item => ({
                product: {
                    product_id: item.product_id,
                    brand: item.brand,
                    name: item.name,
                    price: item.price,
                    image_url: item.image_url
                },
                quantity: item.quantity
            })));
        } catch (e) {
            console.error(e);
        }
    };

    const removeFromCart = async (product) => {
        try {
            const res = await fetch("http://localhost:3000/cart/remove", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ product_id: product.product_id })
            })

            if (!res.ok) {
                throw new Error("Error al remover del carrito");
            }

            const data = await res.json();
            setCartProducts(data.cartItems.map(item => ({
                product: {
                    product_id: item.product_id,
                    brand: item.brand,
                    name: item.name,
                    price: item.price,
                    image_url: item.image_url
                },
                quantity: item.quantity
            })))
        } catch (error) {
            console.error(error);
        }
    }

    const resetCart = async () => {
        if (cartProducts.length === 0) {
            alert("No hay productos en el carrito")
            return
        }

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
        if (cartProducts.length === 0) {
            alert("No hay productos en el carrito")
            return
        }

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