import { useEffect, useState } from "react";

interface ProductDetailsProps {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  images: string[];
}

const ProductDetails = () => {
  const [productDetails, setProductDetails] = useState<ProductDetailsProps>();
  useEffect(() => {
    fetch("https://dummyjson.com/products/1")
      .then((res) => res.json())
      .then((data) => setProductDetails(data));
  }, []);
  return (
    productDetails && (
      <div className="flex gap-4">
        <div className="h-screen w-3/5">
          <div className="h-4/6 bg-white rounded-lg shadow-md overflow-hidden mb-4">
            <img
              src={productDetails.thumbnail}
              alt={productDetails.title}
              className="w-full h-96 object-contain"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {productDetails.images.map((image) => (
              <img
                src={image}
                alt={productDetails.title}
                className="h-48 w-full object-cover rounded border-1 cursor-pointer hover:opacity-90"
              ></img>
            ))}
          </div>
        </div>
        <div className="h-screen w-2/5 bg-white rounded-lg shadow-md px-4">
          <div className="mb-4 mt-2">
            <span className="bg-blue-400 text-blue-800 text-sm font-semibold px-2.5 py-0.5 rounded">
              In Stock: {productDetails.stock}
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-2">{productDetails.title}</h1>
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(productDetails.rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-2 text-sm text-gray-600">
                {productDetails.rating} rating
              </span>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-6">
            ${productDetails.price.toFixed(2)}
          </div>
          <div className="border-t border-b border-gray-200 py-4 mb-6">
            <p className="text-gray-700">{productDetails.description}</p>
          </div>
          <div className="flex justify-center w-full">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg flex-1 transition">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductDetails;
