import { NavLink } from "react-router";
import { Product } from "../types";
import Spinner from "./Spinner";
import { useEffect, useState } from "react";

interface ProductListProps {
  onAddToCart: (product: Product) => void;
}

const ProductList = ({ onAddToCart }: ProductListProps) => {
  const [productList, setProductList] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    fetchProductList();
  }, []);

  const fetchProductList = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();
      setProductList(data.products);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="pt-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
            {productList.map((product) => (
              <div
                key={product.id}
                className="shadow-md rounded-lg p-4 relative"
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-60"
                />
                <NavLink to={`/product/${product.id}`}>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {product.title}
                  </h3>
                </NavLink>
                <p className="text-green-600 font-bold mb-1">
                  ${product.price}
                </p>
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <p className="ml-2 text-sm text-gray-600">
                      {product.rating}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => onAddToCart(product)}
                  className="absolute bottom-2 right-2 px-3 py-1 text-sm font-bold border-2 rounded-md text-white bg-cyan-500 hover:bg-cyan-800 cursor-pointer"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductList;
