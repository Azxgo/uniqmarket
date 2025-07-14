import { CartIcon } from "../../icons/NavBarIcons";
import { useCartContext } from "../../context/cartContext";

export function Cart() {
  const { cartProducts } = useCartContext();
  const totalItems = cartProducts.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="relative hover:bg-zinc-400 rounded-lg px-1">
      <a className="hover:bg-zinc-700" href="/cart" aria-label={`Carrito de compras, ${totalItems} items`}>
        <CartIcon size={66} />
        <span
          aria-live="polite"
          className="absolute bg-gray-800 text-white rounded-full h-5 w-5 flex items-center justify-center text-[10px] right-2 top-3 translate-x-1/2 -translate-y-1/2"
        >
          {totalItems}
        </span>
      </a>
    </div>
  );
}