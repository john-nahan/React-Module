import { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import ProductList from "./components/ProductList";
import { CartProduct, Product } from "./types";
import ProductDetails from "./components/ProductDetails";
import CartList from "./components/CartList";

function App() {
  const [productList, setProductList] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartProduct[]>([]);
  const [cartId, setCartId] = useState<number | null>(null);

  useEffect(() => {
    fetchProductList();
  }, []);

  const fetchProductList = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();
      setProductList(data.products);
    } catch (error) {
      console.log(error);
    }
  };

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
    <>
      <NavBar cart={cart} onDelete={removeFromCart} />
      <ProductList productList={productList} onAddToCart={addToCart} />
      <ProductDetails onAddToCart={addToCart} />
      <CartList />
    </>
  );
}

export default App;
