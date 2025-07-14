import { useCartContext } from "../context/cartContext"
import { SkeletonCart } from "./skeletons/SkeletonCart";
import { useLoad } from "../hooks/useLoad";

export default function Cart() {
    const { cartProducts, addToCart, removeFromCart, resetCart, buyProducts } = useCartContext()

    const totalItems = cartProducts.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartProducts.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    const tl = totalPrice.toLocaleString("es-CL", {
        style: "currency",
        currency: "CLP",
        minimumFractionDigits: 2
    })

    const { loading } = useLoad()

    if (loading) {
        return <SkeletonCart />
    }

    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-[auto_400px] gap-8 items-start">
                <div className="flex flex-col bg-white rounded-md shadow-md p-5">
                    <h1 className="font-bold text-2xl border-b-2 border-gray-300 w-full pb-2">Productos</h1>

                    {cartProducts.length === 0 ? (
                        <div className="flex flex-col justify-center items-center h-100 gap-4">
                            <div className="w-40 h-40 max-h-40 relative overflow-hidden">
                                <img className="w-full h-full object-contain" src="/img/cart-vacio.png" />
                            </div>
                            <div className="flex flex-col justify-center">
                                <h1>No se ha agregado ningun producto al carrito</h1>
                                <button>Ir a la tienda</button>
                            </div>
                        </div>
                    ) : (
                        cartProducts.map(({ product, quantity }) => (
                            <div key={product.product_id} className="flex p-4 w-full border-b-2 border-gray-300 gap-4 items-center">
                                <div className="flex">
                                    <picture className="bg-gray-300 w-32 h-32 rounded-md">
                                        <img src={product.image_url} alt={product.name} />
                                    </picture>
                                </div>
                                <div className="flex flex-col h-full w-full justify-center">
                                    <span className="text-gray-500">{product.brand}</span>
                                    <h1 className="font-bold text-xl max-h-50">{product.name}</h1>
                                    <span className="text-lg">Precio : ${product.price}</span>
                                </div>
                                <div className="flex flex-row h-full max-w-150 justify-end items-center gap-4">
                                    <button className="bg-zinc-900 hover:bg-zinc-700 text-white rounded-md p-1 w-8 h-8 cursor-pointer"
                                        onClick={() => removeFromCart(product)}>-</button>
                                    <span>{quantity}</span>
                                    <button className="bg-zinc-900 hover:bg-zinc-700 text-white rounded-md p-1 w-8 h-8 cursor-pointer"
                                        onClick={() => addToCart(product)}>+</button>
                                </div>
                            </div>
                        ))
                    )}



                </div>
                <div className="flex flex-col bg-white rounded-md shadow-md p-5 ">
                    <h1 className="font-bold text-2xl border-b-2 border-gray-300 w-full pb-2 ">Resumen de la compra</h1>
                    <div className="flex justify-between pt-2">
                        <h3 className="text-lg">Productos: </h3>
                        <span className="text-lg">{totalItems}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b-2 border-gray-300">
                        <h3 className="text-lg">Total: </h3>
                        <span className="text-lg">{tl}</span>
                    </div>
                    <div className="flex flex-col py-3 gap-2">
                        <button className="bg-zinc-900 hover:bg-zinc-700 text-white rounded-md p-1 w-full h-10 cursor-pointer"
                            onClick={buyProducts}>Comprar</button>
                        <button className="bg-zinc-900 hover:bg-zinc-700 text-white rounded-md p-1 w-full h-10 cursor-pointer"
                            onClick={resetCart}>Reiniciar Carrito</button>
                    </div>
                </div>
            </div>
            <title>Carrito - Uniqmarket</title>
        </div>
    )
}