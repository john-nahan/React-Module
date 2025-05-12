import { createContext, ReactNode, useContext, useState } from "react";
import { CartProduct, Product } from "../types";

interface CartContextType {
  cart: CartProduct[];
  addToCart: (product: Product) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: async () => {},
  removeFromCart: async () => {},
});

export const useCartContext = () => useContext(CartContext);

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartProduct[]>([]);
  const [cartId, setCartId] = useState<number | null>(null);

  const addToCart = async (product: Product): Promise<void> => {
    const { id, title, price, thumbnail } = product;
    if (cart.length === 0) {
      try {
        const res = await fetch("https://dummyjson.com/carts/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: 1,
            products: [{ id: product.id, quantity: 1 }],
          }),
        });
        const data = await res.json();
        setCartId(data.id);
        console.log("Saving to db...", data);
        setCart([{ id, title, price, thumbnail, quantity: 1, total: price }]);
      } catch (error) {
        console.log("error creating cart: ", error);
      }
    } else {
      const existingIndex = cart.findIndex((p) => p.id === product.id);
      let newCart;
      if (existingIndex !== -1) {
        newCart = [...cart];
        newCart[existingIndex].quantity++;
        newCart[existingIndex].total =
          newCart[existingIndex].price * newCart[existingIndex].quantity;
      } else {
        newCart = [
          ...cart,
          { id, title, price, thumbnail, quantity: 1, total: price },
        ];
      }

      /* adding products in cart with id 1 */
      try {
        const res = await fetch(`https://dummyjson.com/carts/${cartId}`, {
          method: "PUT" /* or PATCH */,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            merge: true, // this will include existing products in the cart
            products: [
              {
                id: product.id,
                quantity:
                  existingIndex !== -1 ? cart[existingIndex].quantity + 1 : 1,
              },
            ],
          }),
        });
        const data = await res.json();
        console.log("Updating to db...", data);

        setCart(newCart);
      } catch (error) {
        console.log("Error updated cart: ", error);
      }
    }
  };

  const removeFromCart = async (productId: number) => {
    const newCart = [...cart].filter((item) => item.id !== productId);
    try {
      const res = await fetch(`https://dummyjson.com/carts/${cartId}`, {
        method: "PUT" /* or PATCH */,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          merge: true, // this will include existing products in the cart
          products: newCart.map((item) => ({
            id: item.id,
            quantity: item.quantity,
          })),
        }),
      });
      const data = await res.json();
      console.log("Updating to db...", data);

      setCart(newCart);
    } catch (error) {
      console.log("Error updated cart: ", error);
    }
  };
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
