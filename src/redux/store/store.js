// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import productReducer from "../slices/productSlice";
import bestsellersReducer from "../slices/bestsellersSlice";
import wishlistReducer from "../slices/wishlistSlice";
import cartReducer from "../slices/cartSlice.js";
import reviewReducer from "../slices/reviewSlice";
import contactReducer from "../slices/contactSlice";
import testimonialsReducer from "../slices/testimonialsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
     products: productReducer,
     bestsellers: bestsellersReducer,
      wishlist: wishlistReducer,
      cart:cartReducer,
      reviews:reviewReducer,
      contact :contactReducer,
      testimonials:testimonialsReducer,
  },
});

export default store;
