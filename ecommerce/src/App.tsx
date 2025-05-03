import { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import ProductList from "./components/ProductList";
import { CartItem, Product } from "./types";
import ShoppingCart from "./components/ShoppingCart";
// import ProductDetails from "./components/ProductDetails";
// import CartList from "./components/CartList";

function App() {
  const [productList, setProductList] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setProductList(data.products));
  }, []);

  const addToCart = (product: Product): void => {
    const existingIndex = cart.findIndex((p) => p.product.id === product.id);
    if (existingIndex !== -1) {
      const newCart = [...cart];
      newCart[existingIndex].quantity++;
      setCart(newCart);
    } else {
      const newCart = [...cart, { product, quantity: 1 }];
      setCart(newCart);
    }
  };

  const removeFromCart = (productId: number) => {
    const newCart = [...cart].filter((item) => item.product.id !== productId);
    setCart(newCart);
  };

  return (
    <>
      <NavBar cart={cart} onDelete={removeFromCart} />
      <ShoppingCart cart={cart} onDelete={removeFromCart} />
      <ProductList productList={productList} onAddToCart={addToCart} />
      {/* <ProductDetails />
      <CartList /> */}
    </>
  );
}

export default App;
