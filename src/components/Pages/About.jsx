// src/pages/About.jsx
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../../redux/slices/productSlice.js";
import WhatsAppOrderButton from "../Button/WhatsAppOrderButton.jsx";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer";
import HowItWorks from "./Works.jsx";
import PricingData from "./PricingData.jsx";
import FAQ from "./Faq.jsx";

const About = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    document.title = "SketchWebsite - About Us";
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#FFF8F0] to-[#FFF3E0]">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-16">
        {/* Hero Section */}
      <section className="mb-20 bg-gradient-to-r from-[#FFE6CC] to-[#FFD8A6] rounded-xl p-10 text-center shadow-lg">
          <motion.h2
            className="text-3xl font-bold text-[#D19F70] mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            About Us
          </motion.h2>
          <motion.p
            className="text-gray-800 max-w-3xl mx-auto text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            At SketchLogo, we create beautiful pencil, color, and couple
            sketches that bring your memories to life. Our talented artists
            handcraft each piece with love and precision. Customers can place
            orders for portraits, pets, or custom themes, and our admin manages
            creation and delivery, ensuring top-quality artwork every time.
          </motion.p>
        </section>

        {/* How it Works */}
      <HowItWorks/>

        {/* Featured Sketches Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#D19F70]">
            Featured Sketches
          </h2>

          {loading && (
            <div className="text-center py-10 text-gray-500">
              <p>Loading sketches...</p>
              <div className="flex flex-wrap gap-6 justify-center mt-6">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="w-60 h-80 bg-gray-200 animate-pulse rounded-xl"
                  ></div>
                ))}
              </div>
            </div>
          )}

          {error && <p className="text-center py-10 text-red-500">{error}</p>}

          {!loading && !error && products.length === 0 && (
            <p className="text-center py-10 text-gray-500">No sketches found!</p>
          )}

          {!loading && !error && products.length > 0 && (
            <div className="flex flex-wrap gap-6 justify-center">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="w-60 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg cursor-pointer flex flex-col transition-transform transform hover:scale-105"
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  {/* Product Image */}
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

                  {/* Product Info */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <h3
                      className="text-lg font-semibold text-gray-800 mb-2"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
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
          )}
        </section>


      

      <PricingData/>

        <FAQ/>
      </main>

      <Footer />
    </div>
  );
};

export default About;
