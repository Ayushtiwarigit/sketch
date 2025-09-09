// src/pages/WishlistPage.jsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../redux/slices/wishlistSlice";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // ✅ import motion
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";

const WishlistPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.wishlist);
  const token = useSelector((state) => state.auth.user?.token);

  useEffect(() => {
    if (token) dispatch(fetchWishlist(token));
  }, [dispatch, token]);

  useEffect(() => {
    document.title = "SketchWebsite - Wishlist";
  }, []);

  const isInWishlist = (productId) =>
    items.some((item) => item._id === productId);

  const handleWishlistToggle = (productId) => {
    if (!token) return;
    if (isInWishlist(productId)) {
      dispatch(removeFromWishlist({ productId, token }));
    } else {
      dispatch(addToWishlist({ productId, token }));
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow container mx-auto p-4">
  
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6"
        >
          <h1 className="text-4xl font-bold mb-4">Wishlist</h1>
        
        </motion.div>

        {items.length === 0 ? (
          <p className="text-center mt-10 text-lg">Your wishlist is empty</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((item) => (
              <div
                key={item._id}
                className="relative border p-4 rounded shadow hover:shadow-md transition cursor-pointer"
              >
                <div
                  className="relative"
                  onClick={() => handleProductClick(item._id)}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover mb-2 rounded"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWishlistToggle(item._id);
                    }}
                    className="absolute top-2 right-2 text-xl"
                  >
                    <FaHeart
                      className={`${
                        isInWishlist(item._id)
                          ? "text-red-500"
                          : "text-black"
                      } transition-colors duration-200`}
                    />
                  </button>
                </div>

                <h3
                  className="font-semibold"
                  onClick={() => handleProductClick(item._id)}
                >
                  {item.title}
                </h3>
                <p className="text-green-700 font-bold">₹{item.price}</p>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default WishlistPage;
