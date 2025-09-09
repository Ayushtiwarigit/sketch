// // src/pages/ProductDetails.jsx
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams, Link } from "react-router-dom";
// import {
//   fetchProductById,
//   clearProducts,
// } from "../../redux/slices/productSlice";
// import {
//   addToWishlist,
//   removeFromWishlist,
//   fetchWishlist,
// } from "../../redux/slices/wishlistSlice";
// import { addToCart, getCart } from "../../redux/slices/cartSlice.js";
// import { FaHeart, FaShoppingCart } from "react-icons/fa";
// import Header from "../Header/Header.jsx";
// import WhatsAppOrderButton from "../../components/Button/WhatsAppOrderButton.jsx";
// import Footer from "../Footer/Footer.jsx";
// import { toast } from "react-toastify";
// import ReviewSection from "./ReviewPage.jsx";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();

//   const { product, loading } = useSelector((state) => state.products);
//   const { items: wishlistItems } = useSelector((state) => state.wishlist);
//   const {
//     items: cartItems,
//     message: cartMessage,
//     error: cartError,
//     loading: cartLoading,
//   } = useSelector((state) => state.cart);

//   const [mainImage, setMainImage] = useState("");
//   const [quantity, setQuantity] = useState(1);

//   const token = useSelector((state) => state.auth.token);

//   useEffect(() => {
//     document.title = "SketchWebsite - Product";
//   }, []);

//   useEffect(() => {
//     dispatch(fetchProductById(id));
//     if (token) {
//       dispatch(fetchWishlist(token));
//       dispatch(getCart(token));
//     }
//     return () => {
//       dispatch(clearProducts());
//     };
//   }, [dispatch, id, token]);

//   useEffect(() => {
//     if (product) setMainImage(product.image);
//   }, [product]);

//   useEffect(() => {
//     if (cartMessage) toast.success(cartMessage);
//     if (cartError) toast.error(cartError);
//   }, [cartMessage, cartError]);

//   const isInWishlist = wishlistItems.some((item) => item._id === product?._id);

//   const handleWishlistToggle = () => {
//     if (!token) {
//       toast.error("Please login to manage wishlist");
//       return;
//     }
//     if (isInWishlist) {
//       dispatch(removeFromWishlist({ productId: product._id, token }));
//     } else {
//       dispatch(addToWishlist({ productId: product._id, token }));
//     }
//   };

//   const handleAddToCart = async () => {
//     if (!token) {
//       toast.error("Please login to add to cart");
//       return;
//     }
//     try {
//       const existingItem = cartItems.find(
//         (item) => item.product._id === product._id
//       );
//       const newQuantity = existingItem
//         ? existingItem.quantity + quantity
//         : quantity;

//       const result = await dispatch(
//         addToCart({ productId: product._id, quantity: newQuantity, token })
//       );

//       if (result.meta.requestStatus === "fulfilled") {
//         dispatch(getCart(token));
//         toast.success("Added to cart!");
//       } else {
//         toast.error(result.payload?.message || "Failed to add to cart");
//       }
//     } catch {
//       toast.error("Something went wrong");
//     }
//   };

//   return (
//     <>
//       <Header />

//       <div className="container mx-auto p-4">
//         {/* Breadcrumb */}
// <nav aria-label="breadcrumb" className="mb-4">
//   <ol className="breadcrumb flex gap-2 text-sm text-[#d4a373]">
//     <li>
//       <Link
//         to="/home"
//         className="text-[#d4a373] text-dark text-decoration-none"
//       >
//         Home
//       </Link>
//     </li>
//     <li>/</li>
//     <li>
//       <Link
//         to="/products"
//         className=" text-dark text-decoration-none"
//       >
//         Products
//       </Link>
//     </li>
//     <li>/</li>
//     <li className="font-semibold text-gray-800">
//       {loading || !product ? (
//         <span className="inline-block w-32 h-4 bg-gray-300 animate-pulse rounded"></span>
//       ) : (
//         product?.title
//       )}
//     </li>
//   </ol>
// </nav>



//         {/* Product Section */}
//         <div className="flex flex-col md:flex-row gap-8">
//           {/* Left: Images */}
//           <div className="flex flex-col items-center md:items-start relative">
//             {loading ? (
//               <div className="w-full max-w-2xl h-96 bg-gray-300 rounded shadow animate-pulse mb-4"></div>
//             ) : (
//               <img
//                 src={mainImage || product?.image}
//                 alt={product?.title || "Product Image"}
//                 className="product-main-img w-full max-w-2xl mb-4 rounded shadow"
//               />
//             )}

//             {/* ❤️ Wishlist Heart Icon */}
//             {!loading && product && (
//               <button
//                 onClick={handleWishlistToggle}
//                 className="absolute top-4 right-4 text-3xl"
//               >
//                 <FaHeart
//                   className={`${
//                     isInWishlist ? "text-red-500" : "text-gray-400"
//                   } text-3xl hover:scale-110 transition-transform duration-200`}
//                 />
//               </button>
//             )}

//             <div className="flex gap-2 overflow-x-auto mt-2">
//               {loading
//                 ? [0, 1, 2, 3].map((i) => (
//                     <div
//                       key={i}
//                       className="w-24 h-24 bg-gray-300 rounded animate-pulse"
//                     />
//                   ))
//                 : [product?.image, ...(product?.gallery || [])].map(
//                     (img, index) =>
//                       img && (
//                         <img
//                           key={index}
//                           src={img}
//                           alt={`${product?.title}-${index}`}
//                           className="w-24 h-24 object-cover cursor-pointer rounded border hover:border-gray-500"
//                           onClick={() => setMainImage(img)}
//                         />
//                       )
//                   )}
//             </div>
//           </div>

//           {/* Right: Product details */}
//           <div className="flex-1 flex flex-col gap-3">
//             {loading ? (
//               <>
//                 <div className="w-64 h-8 bg-gray-300 animate-pulse rounded mb-2"></div>
//                 <div className="space-y-2 mt-2">
//                   {[...Array(6)].map((_, i) => (
//                     <div
//                       key={i}
//                       className="w-full h-4 bg-gray-300 animate-pulse rounded"
//                     />
//                   ))}
//                 </div>
//                 <div className="w-32 h-6 bg-gray-300 animate-pulse rounded mt-4"></div>
//                 <div className="flex gap-2 mt-4">
//                   <div className="w-24 h-10 bg-gray-300 animate-pulse rounded"></div>
//                   <div className="w-24 h-10 bg-gray-300 animate-pulse rounded"></div>
//                 </div>
//               </>
//             ) : (
//               <>
//                 <h1 className="text-3xl font-bold">{product?.title}</h1>

//                 {/* Features */}
//                 <div className="mt-3 space-y-3">
//                   <div className="flex items-center gap-2">
//                     <span className="text-red-500 text-xl">♡</span>
//                     <span>Completely Hand-Drawn</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <span className="text-green-600 text-xl">🔒</span>
//                     <span>Secure Online Payment</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <span className="text-blue-500 text-xl">↩</span>
//                     <span>100% Money Back Guarantee</span>
//                   </div>
//                 </div>

//                 <p className="text-xl font-semibold text-green-700 mt-4">
//                   ₹{product?.price}
//                 </p>
//                 <p className="text-gray-700">
//                   Paper Size: {product?.paperSize}
//                 </p>
//                 <p className="text-gray-700">Number of Faces: {product?.faces}</p>

//                 {/* Quantity Selector */}
//                 <div className="mt-4 flex items-center gap-3">
//                   <label className="font-medium">Quantity:</label>
//                   <div className="flex items-center border rounded">
//                     <button
//                       onClick={() =>
//                         setQuantity((prev) => Math.max(1, prev - 1))
//                       }
//                       className="px-3 py-1 bg-gray-200 hover:bg-gray-300"
//                     >
//                       -
//                     </button>
//                     <span className="px-4">{quantity}</span>
//                     <button
//                       onClick={() => setQuantity((prev) => prev + 1)}
//                       className="px-3 py-1 bg-gray-200 hover:bg-gray-300"
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>

//                 {/* Buttons */}
//                 <div className="mt-6 flex flex-col md:flex-row gap-3">
//                   <button
//                     onClick={handleAddToCart}
//                     disabled={cartLoading}
//                     className="flex items-center gap-2 bg-gradient-to-r from-[#d4a373] to-[#b9855c] text-white font-medium px-4 py-2 rounded"
//                   >
//                     <FaShoppingCart />
//                     {cartLoading ? "Adding..." : "Add to Cart"}
//                   </button>
//                   <WhatsAppOrderButton className="whatsapp-btn" />
//                 </div>

//                 <p className="mt-2 text-sm text-gray-500">
//                   Items in Cart: {cartItems.length}
//                 </p>
//               </>
//             )}
//           </div>
//         </div>
//         <ReviewSection productId={id} />
//       </div>

//       <Footer />
//     </>
//   );
// };

// export default ProductDetails;
// src/pages/ProductDetails.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  fetchProductById,
  clearProducts,
} from "../../redux/slices/productSlice";
import {
  addToWishlist,
  removeFromWishlist,
  fetchWishlist,
} from "../../redux/slices/wishlistSlice";
import { addToCart, getCart } from "../../redux/slices/cartSlice.js";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import Header from "../Header/Header.jsx";
import WhatsAppOrderButton from "../../components/Button/WhatsAppOrderButton.jsx";
import Footer from "../Footer/Footer.jsx";
import { toast } from "react-toastify";
import ReviewSection from "./ReviewPage.jsx";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { product, loading } = useSelector((state) => state.products);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const {
    items: cartItems,
    message: cartMessage,
    error: cartError,
    loading: cartLoading,
  } = useSelector((state) => state.cart);

  const [mainMedia, setMainMedia] = useState("");
  const [quantity, setQuantity] = useState(1);

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    document.title = "SketchWebsite - Product";
  }, []);

  useEffect(() => {
    dispatch(fetchProductById(id));
    if (token) {
      dispatch(fetchWishlist(token));
      dispatch(getCart(token));
    }
    return () => {
      dispatch(clearProducts());
    };
  }, [dispatch, id, token]);

  useEffect(() => {
    if (product) setMainMedia(product.image);
  }, [product]);

  useEffect(() => {
    if (cartMessage) toast.success(cartMessage);
    if (cartError) toast.error(cartError);
  }, [cartMessage, cartError]);

  const isInWishlist = wishlistItems.some((item) => item._id === product?._id);

  const handleWishlistToggle = () => {
    if (!token) {
      toast.error("Please login to manage wishlist");
      return;
    }
    if (isInWishlist) {
      dispatch(removeFromWishlist({ productId: product._id, token }));
    } else {
      dispatch(addToWishlist({ productId: product._id, token }));
    }
  };

  const handleAddToCart = async () => {
    if (!token) {
      toast.error("Please login to add to cart");
      return;
    }
    try {
      const existingItem = cartItems.find(
        (item) => item.product._id === product._id
      );
      const newQuantity = existingItem
        ? existingItem.quantity + quantity
        : quantity;

      const result = await dispatch(
        addToCart({ productId: product._id, quantity: newQuantity, token })
      );

      if (result.meta.requestStatus === "fulfilled") {
        dispatch(getCart(token));
        toast.success("Added to cart!");
      } else {
        toast.error(result.payload?.message || "Failed to add to cart");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  const mediaList = product
    ? [product.image, ...(product.gallery || []), ...(product.videos || [])]
    : [];

  return (
    <>
      <Header />

      <div className="container mx-auto p-4">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb flex gap-2 text-sm text-[#d4a373]">
            <li>
              <Link
                to="/home"
                className="text-[#d4a373] text-dark text-decoration-none"
              >
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link
                to="/products"
                className="text-dark text-decoration-none"
              >
                Products
              </Link>
            </li>
            <li>/</li>
            <li className="font-semibold text-gray-800">
              {loading || !product ? (
                <span className="inline-block w-32 h-4 bg-gray-300 animate-pulse rounded"></span>
              ) : (
                product?.title
              )}
            </li>
          </ol>
        </nav>

        {/* Product Section */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left: Images & Videos */}
          <div className="flex flex-col items-center md:items-start relative">
            {loading ? (
              <div className="w-full max-w-2xl h-96 bg-gray-300 rounded shadow animate-pulse mb-4"></div>
            ) : mainMedia?.endsWith(".mp4") ? (
              <video
                src={mainMedia}
                controls
                className="w-full max-w-2xl mb-4 rounded shadow"
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                src={mainMedia || product?.image}
                alt={product?.title || "Product Image"}
                className="w-full max-w-2xl mb-4 rounded shadow"
              />
            )}

            {/* Wishlist Heart */}
            {!loading && product && (
              <button
                onClick={handleWishlistToggle}
                className="absolute top-4 right-4 text-3xl"
              >
                <FaHeart
                  className={`${
                    isInWishlist ? "text-red-500" : "text-gray-400"
                  } text-3xl hover:scale-110 transition-transform duration-200`}
                />
              </button>
            )}

            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto mt-2">
              {loading
                ? [0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-24 h-24 bg-gray-300 rounded animate-pulse"
                    />
                  ))
                : mediaList.map((media, index) => {
                    const isVideo = media.endsWith(".mp4");
                    return (
                      <div
                        key={index}
                        className="relative w-24 h-24 cursor-pointer"
                      >
                        {isVideo ? (
                          <video
                            src={media}
                            className="w-full h-full object-cover rounded border hover:border-gray-500"
                            onClick={() => setMainMedia(media)}
                          />
                        ) : (
                          <img
                            src={media}
                            alt={`${product?.title}-${index}`}
                            className="w-full h-full object-cover rounded border hover:border-gray-500"
                            onClick={() => setMainMedia(media)}
                          />
                        )}
                        {isVideo && (
                          <span className="absolute top-1 right-1 text-white text-sm bg-black bg-opacity-50 px-1 rounded">
                            ▶
                          </span>
                        )}
                      </div>
                    );
                  })}
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="flex-1 flex flex-col gap-3">
            {loading ? (
              <>
                <div className="w-64 h-8 bg-gray-300 animate-pulse rounded mb-2"></div>
                <div className="space-y-2 mt-2">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="w-full h-4 bg-gray-300 animate-pulse rounded"
                    />
                  ))}
                </div>
                <div className="w-32 h-6 bg-gray-300 animate-pulse rounded mt-4"></div>
                <div className="flex gap-2 mt-4">
                  <div className="w-24 h-10 bg-gray-300 animate-pulse rounded"></div>
                  <div className="w-24 h-10 bg-gray-300 animate-pulse rounded"></div>
                </div>
              </>
            ) : (
              <>
                <h1 className="text-3xl font-bold">{product?.title}</h1>

                {/* Features */}
                <div className="mt-3 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-red-500 text-xl">♡</span>
                    <span>Completely Hand-Drawn</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600 text-xl">🔒</span>
                    <span>Secure Online Payment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-500 text-xl">↩</span>
                    <span>100% Money Back Guarantee</span>
                  </div>
                </div>

                <p className="text-xl font-semibold text-green-700 mt-4">
                  ₹{product?.price}
                </p>
                <p className="text-gray-700">
                  Paper Size: {product?.paperSize}
                </p>
                <p className="text-gray-700">Number of Faces: {product?.faces}</p>

                {/* Quantity Selector */}
                <div className="mt-4 flex items-center gap-3">
                  <label className="font-medium">Quantity:</label>
                  <div className="flex items-center border rounded">
                    <button
                      onClick={() =>
                        setQuantity((prev) => Math.max(1, prev - 1))
                      }
                      className="px-3 py-1 bg-gray-200 hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="px-4">{quantity}</span>
                    <button
                      onClick={() => setQuantity((prev) => prev + 1)}
                      className="px-3 py-1 bg-gray-200 hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Buttons */}
                <div className="mt-6 flex flex-col md:flex-row gap-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={cartLoading}
                    className="flex items-center gap-2 bg-gradient-to-r from-[#d4a373] to-[#b9855c] text-white font-medium px-4 py-2 rounded"
                  >
                    <FaShoppingCart />
                    {cartLoading ? "Adding..." : "Add to Cart"}
                  </button>
                  <WhatsAppOrderButton className="whatsapp-btn" />
                </div>

                <p className="mt-2 text-sm text-gray-500">
                  Items in Cart: {cartItems.length}
                </p>
              </>
            )}
          </div>
        </div>

        {/* Reviews */}
        <ReviewSection productId={id} />
      </div>

      <Footer />
    </>
  );
};

export default ProductDetails;
