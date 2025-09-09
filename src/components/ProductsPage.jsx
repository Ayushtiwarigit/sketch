import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../redux/slices/productSlice";
import WhatsAppOrderButton from "../components/Button/WhatsAppOrderButton";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Gallery from "./Pages/Gallery";
import FAQ from "./Pages/Faq";

export default function ProductsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, error } = useSelector((state) => state.products);

 
  useEffect(() => {
    document.title = "SketchWebsite - Products";
  }, []);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <p className="text-center py-10 text-gray-500">Loading products...</p>
        <div className="flex flex-wrap gap-6 justify-center">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="w-60 h-80 bg-gray-200 animate-pulse rounded-xl"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  if (error)
    return <p className="text-center py-10 text-red-500">{error}</p>;

  if (!products.length)
    return <p className="text-center py-10 text-gray-500">No products found</p>;

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          🛍️ All Products
        </h2>

        <div className="flex flex-wrap gap-6 justify-center">
          {products.map((product) => (
            <div
              key={product._id}
              className="w-60 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg cursor-pointer flex flex-col transition-transform transform hover:scale-105"
              onClick={() => navigate(`/product/${product._id}`)}
            >
              <div className="relative w-full h-64">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-gradient-to-r from-[#d4a373] to-[#b9855c] text-white px-2 py-1 rounded-md text-sm font-semibold shadow-md">
                  ₹{product.price}
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                  {product.title}
                </h3>
                <p
                  className="text-gray-600 text-sm mb-3 overflow-hidden"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {product.description}
                </p>

                <div className="mt-auto">
                  <WhatsAppOrderButton productName={product.title} />
                </div>
              </div>
            </div>
          ))}
        </div>
     
        <FAQ/>
      </div>
      <Footer />
    </>
  );
}
