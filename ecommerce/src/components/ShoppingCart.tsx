import { useState } from "react";
import CartModal from "./CartModal";
import { useCartContext } from "../context/useCartContext";

const ShoppingCart = () => {
  const { cart } = useCartContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <div className="relative">
      <button
        className="relative p-2 hover:cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          ></path>
        </svg>
        {totalQuantity > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {totalQuantity}
          </span>
        )}
      </button>

      <CartModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default ShoppingCart;
