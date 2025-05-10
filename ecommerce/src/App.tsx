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

  const addToCart = (product: Product): void => {
    const {id, title, price, thumbnail} = product;
    const existingIndex = cart.findIndex((p) => p.id === product.id);
    if (existingIndex !== -1) {
      const newCart = [...cart];
      newCart[existingIndex].quantity++;
      setCart(newCart);
    } else {
      const newCart = [...cart, {id, title, price, thumbnail, quantity: 1, total: product.price}];
      setCart(newCart);
    }
  };

  const removeFromCart = (productId: number) => {
    const newCart = [...cart].filter((item) => item.id !== productId);
    setCart(newCart);
  };

  return (
    <>
      <NavBar cart={cart} onDelete={removeFromCart} />
      <ProductList productList={productList} onAddToCart={addToCart} />
      <ProductDetails />
      <CartList />
    </>
  );
}

export default App;
