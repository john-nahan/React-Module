import { useEffect } from "react";
import { CartItem } from "../types";
import { formatPrice } from "../utils/FormatNumbers";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: (productId: number) => void;
  cart: CartItem[];
}

const CartModal = ({ isOpen, onClose, onDelete, cart }: CartModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, [isOpen]);
  if (!isOpen) return null;

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <>
      <div className="relative z-40">
        <div className="fixed bg-white rounded-lg h-9/10 w-96 shadow-xl top-auto right-0 flex flex-col">
          <div className="flex items-center justify-between border-b px-4 py-3 top-0">
            <h2 className="text-xl font-semibold">Your Cart</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>

          <div className="px-4 py-3 overflow-y-auto ">
            {cart.length === 0 ? (
              <p className="text-xl font-semibold">Your cart is empty.</p>
            ) : (
              <>
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center jutify-center mb-4 border-b pb-4"
                  >
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="ml-4 flex-grow">
                      <h3 className="font-medium">{item.product.title}</h3>
                      <div className="flex justify-between mt-1">
                        <span>
                          ${formatPrice(item.product.price)} x {item.quantity}
                        </span>
                        <span>
                          ${formatPrice(item.product.price * item.quantity)}
                        </span>
                        <button
                          className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600 hover:cursor-pointer"
                          aria-label="Remove item"
                          onClick={() => onDelete(item.product.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {cart.length > 0 && (
            <div className="border-t px-4 py-3">
              <div className="flex justify-between front-semibold mb-4">
                <span>Total:</span>
                <span>${formatPrice(totalPrice)}</span>
              </div>
              <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700">
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartModal;
