
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, updateCartItem } from "../redux/slices/cartSlice";
import { Link } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import WhatsAppOrderButton from "../components/Button/WhatsAppOrderButton";
import { toast } from "react-toastify";
import { FaPlus, FaMinus,FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion"; 

// Skeleton loader
const SkeletonCard = () => (
  <div className="animate-pulse bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
    <div className="bg-gray-200 h-48 sm:h-56 w-full" />
    <div className="p-4 flex-1 flex flex-col justify-between">
      <div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
      </div>
      <div className="mt-4 flex gap-2">
        <div className="flex-1 h-10 bg-gray-200 rounded"></div>
        <div className="flex-1 h-10 bg-gray-200 rounded"></div>
      </div>
    </div>
  </div>
);

export default function CartPage() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.auth);

  // Local state to track which item is being updated
  const [updatingItemId, setUpdatingItemId] = useState(null);

  useEffect(() => {
    if (token) dispatch(getCart(token));
  }, [dispatch, token]);
    useEffect(() => {
      document.title = "SketchWebsite - Cart";
    }, []);

  const handleUpdateQuantity = async (productId, action) => {
    setUpdatingItemId(productId); // mark item as updating

    // Optimistic UI update
    const updatedItems = items.map((item) =>
      item.product._id === productId
        ? {
            ...item,
            quantity:
              action === "increment"
                ? item.quantity + 1
                : Math.max(1, item.quantity - 1),
          }
        : item
    );
    dispatch({ type: "cart/resetCartState", payload: updatedItems });

    try {
      const res = await dispatch(
        updateCartItem({ productId, action, token })
      ).unwrap();
      if (Array.isArray(res.data)) {
        dispatch({ type: "cart/resetCartState", payload: res.data });
      }
      toast.success(`Quantity ${action}ed successfully`);
    } catch (err) {
      toast.error(err?.message || "Failed to update quantity");
      dispatch(getCart(token)); // revert on error
    } finally {
      setUpdatingItemId(null); // remove updating state
    }
  };

  const handleClearCart = async () => {
    try {
      await dispatch(clearCart(token)).unwrap();
      toast.success("Cart cleared successfully");
    } catch (err) {
      toast.error(err || "Failed to clear cart");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-10">
     
           <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-6"
                >
                  <h1 className="text-4xl font-bold mb-4">Your Cart    </h1>
                
                </motion.div>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : items.length === 0 ? (
          <p className="text-center py-20 text-gray-500 text-lg">
            Your cart is empty
          </p>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {items.map((item) => (
                <div
                  key={item.product._id}
                  className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:scale-105 flex flex-col ${
                    updatingItemId === item.product._id
                      ? "opacity-70 pointer-events-none"
                      : ""
                  }`}
                >
               {/* Product Image */}
<Link
  to={`/product/${item.product._id}`}
  className="relative w-full h-48 sm:h-56 rounded-t-xl overflow-hidden text-black no-underline"
>
  <img
    src={item.product?.image || "/placeholder.jpg"}
    alt={item.product?.title}
    className="w-full h-full object-cover rounded-t-xl"
  />
  <div className="absolute top-2 right-2 bg-[#b9855c] text-white px-3 py-1 rounded-md text-sm font-semibold shadow">
    ₹{item.product?.price || "N/A"}
  </div>
</Link>





                  {/* Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <Link to={`/product/${item.product._id}`}>
                        <h3 className="text-lg font-semibold text-gray-800 truncate mb-1">
                          {item.product?.title || "Unnamed"}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {item.product?.description || "No description"}
                      </p>

                      {/* Quantity Controls */}
                      <div className="mt-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                        <span>Quantity:</span>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item.product._id, "decrement")
                          }
                          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-2 rounded"
                          disabled={updatingItemId === item.product._id}
                        >
                          <FaMinus />
                        </button>
                        <span className="px-2">{item.quantity}</span>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item.product._id, "increment")
                          }
                          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-2 rounded"
                          disabled={updatingItemId === item.product._id}
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="mt-4 flex gap-2">
                      <WhatsAppOrderButton
                        productName={item.product?.title}
                        className="flex-1 bg-gradient-to-r from-[#d4a373] to-[#b9855c] text-white py-2 rounded-lg hover:opacity-90 font-medium transition flex items-center justify-center gap-2"
                      >
                        <FaShoppingCart /> Order Now
                      </WhatsAppOrderButton>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Clear Cart Button */}
            <div className="mt-10 flex justify-center">
              <button
                onClick={handleClearCart}
                className="w-full sm:w-1/2 lg:w-1/3 bg-gradient-to-r from-[#d4a373] to-[#b9855c] text-white py-3 rounded-lg hover:opacity-90 text-lg font-medium shadow transition"
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
