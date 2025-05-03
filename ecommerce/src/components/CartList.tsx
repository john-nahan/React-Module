import { useEffect, useState } from "react";
import { CartProduct } from "../types";
import { formatPrice } from "../utils/FormatNumbers";

interface CartListProps {
  id: number;
  products: CartProduct[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

const CartList = () => {
  const [cartList, setCartList] = useState<CartListProps[]>([]);
  useEffect(() => {
    fetch("https://dummyjson.com/carts")
      .then((res) => res.json())
      .then((data) => setCartList(data.carts));
  }, []);

  const totalPrice = cartList.reduce((sum, cart) => sum + cart.total, 0);

  const handleDeleteItem = (productId: number) => {
    setCartList(
      cartList.map((cart) => ({
        ...cart,
        products: cart.products.filter((p) => p.id !== productId),
        totalProducts: cart.products.filter((p) => p.id !== productId).length,
        totalQuantity: cart.products
          .filter((p) => p.id != productId)
          .reduce((sum, p) => sum + p.quantity, 0),
        total: cart.products
          .filter((p) => p.id !== productId)
          .reduce((sum, p) => sum + p.price * p.quantity, 0),
      }))
    );
  };

  return cartList.length === 0 ? (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 py-16">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-24 w-24 mx-auto text-gray-300 mb-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
        <h1 className="text-2xl font-bold text-gray-800 mb-3">Shopping Cart</h1>
        <p className="text-gray-600 mb-6">Your cart is empty.</p>
        <button className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
          Continue Shopping
        </button>
      </div>
    </div>
  ) : (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-3/5 p-4">
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200 mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Shopping Cart</h1>
          <h3 className="text-lg text-gray-600">{cartList.length} items</h3>
        </div>
        <div className="space-y-4">
          {cartList.map((cart) => (
            <div key={cart.id} className="bg-white rounded-lg shadow-sm">
              {cart.products &&
                cart.products.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between p-4 border-b last:border-b-0 border-gray-100 hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={p.thumbnail}
                        alt={p.title}
                        className="w-24 h-24 object-cover rounded-md"
                      />
                      <div>
                        <p className="font-medium text-gray-800">{p.title}</p>
                        <p className="text-sm text-gray-500">
                          {cart.totalQuantity}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <p className="font-semibold text-gray-900">
                        ${formatPrice(p.price)}
                      </p>
                      <button
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600 hover:cursor-pointer"
                        aria-label="Remove item"
                        onClick={() => handleDeleteItem(p.id)}
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
                ))}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full md:w-2/5 md:h-screen bg-white p-6 rounded-lg shadow-md">
        <div className="mb-6">
          <p className="text-xl font-bold text-gray-800 pb-3 border-b border-gray-200">
            Order Summary
          </p>
        </div>
        <div className="flex justify-between py-3">
          <p className="text-gray-600">Items {cartList.length}</p>
          <p className="font-medium">${formatPrice(totalPrice)}</p>
        </div>
        <div className="py-4 border-b border-gray-200">
          <p className="text-gray-600 text-sm font-medium mb-2">SHIPPING</p>
          <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
            <option value="standard">Standard Delivery - $0.00</option>
            <option value="express">Express Delivery - $10.00</option>
            <option value="next">Next Day Delivery - $20.00</option>
          </select>
        </div>
        <div className="py-4 border-b border-gray-200">
          <p className="text-gray-600 text-sm font-medium mb-2">PROMO CODE</p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter code"
              className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <button className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700">
              Apply
            </button>
          </div>
        </div>
        <div className="py-4 border-b border-gray-200">
          <div className="flex justify-between py-2">
            <p className="text-gray-600">Subtotal</p>
            <p className="font-medium">${formatPrice(totalPrice)}</p>
          </div>
          <div className="flex justify-between py-2">
            <p className="text-gray-600">Shipping</p>
            <p className="font-medium">$0.00</p>
          </div>
        </div>
        <div className="flex justify-between py-4 mb-6">
          <p className="text-lg font-bold">Total</p>
          <p className="text-lg font-bold">${formatPrice(totalPrice)}</p>
        </div>
        <div className="grid grid-cols-1 gap-4 mb-6">
          <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-medium">
            Checkout
          </button>
          <button className="w-full border border-gray-300 bg-white text-gray-700 py-3 rounded-md hover:bg-gray-50 transition-colors font-medium flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartList;
