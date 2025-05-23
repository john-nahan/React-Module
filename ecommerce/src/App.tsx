import "./App.css";
import NavBar from "./components/NavBar";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import CartList from "./components/CartList";
import { BrowserRouter, Route, Routes } from "react-router";
import CartProvider from "./context/CartContext";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/cart" element={<CartList />} />
            <Route path="/product" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="*" element={<h1>404 not found!</h1>} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
