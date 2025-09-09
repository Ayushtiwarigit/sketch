import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import WhatsAppOrderButton from "../components/Button/WhatsAppOrderButton";
import { fetchBestsellers } from "../redux/slices/bestsellersSlice";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import PricingSection from "./Pages/PricingData";

// ✅ Import PhotoView
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

export default function BestSellersPage() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.bestsellers);

  useEffect(() => {
    document.title = "SketchWebsite - Bestsellers";
    dispatch(fetchBestsellers());
  }, [dispatch]);

  // Skeleton loader array
  const skeletons = Array(8).fill(0);

  return (
    <>
      <Header />
      <section className="py-12 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            🔥 Best Sellers
          </h2>

          {error && (
            <p className="text-center py-12 text-red-500">Error: {error}</p>
          )}

          <PhotoProvider>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {loading
                ? skeletons.map((_, index) => (
                    <div
                      key={index}
                      className="bg-white shadow-md rounded-xl overflow-hidden p-4 animate-pulse flex flex-col items-center"
                    >
                      <div className="w-full h-64 bg-gray-300 rounded-md mb-4"></div>
                      <div className="w-24 h-6 bg-gray-300 rounded-full mb-2"></div>
                      <div className="w-32 h-4 bg-gray-300 rounded mb-3"></div>
                      <div className="mt-auto w-full flex justify-center">
                        <div className="w-full max-w-xs h-10 bg-gray-300 rounded-full"></div>
                      </div>
                    </div>
                  ))
                : items.map((product) => (
                    <div
                      key={product._id}
                      className="relative bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition p-4 flex flex-col items-center"
                    >
                      {/* PhotoView Wrapper */}
                      <PhotoView src={product.image}>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-64 object-cover rounded-md mb-4 cursor-pointer"
                        />
                      </PhotoView>

                      <div className="absolute top-8 right-8 bg-gradient-to-r from-[#d4a373] to-[#b9855c] text-white text-sm font-semibold px-3 py-1 rounded-full shadow-md">
                        Best Seller
                      </div>

                      <h3 className="text-lg font-semibold text-gray-800 text-center">
                        {product.name}
                      </h3>
                      <p className="text-gray-500 text-sm mb-3 text-center">
                        {product.bio}
                      </p>

                      <div className="mt-auto w-full flex justify-center">
                        <WhatsAppOrderButton
                          productName={product.title}
                          className="w-full max-w-xs"
                        />
                      </div>
                    </div>
                  ))}
            </div>
          </PhotoProvider>
        </div>
      </section>
      <PricingSection />
      <Footer />
    </>
  );
}
