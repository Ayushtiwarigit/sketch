// src/redux/slices/cartSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = `${import.meta.env.VITE_API_URL}/cart`;

// ------------------ Async Thunks ------------------

// Update quantity (increment / decrement)
export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ productId, action, token }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(
        `${API_BASE}/${productId}`,
        { action }, // { action: "increment" | "decrement" }
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data; // { success, message, data: [updatedCart] or {product} }
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Error updating cart item" }
      );
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity = 1, token }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_BASE}/add`,
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data; // { success, message, data: [cart] OR {product} }
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Error adding to cart" });
    }
  }
);

// Get cart
export const getCart = createAsyncThunk(
  "cart/getCart",
  async (token, { rejectWithValue }) => {
    try {
      const res = await axios.get(API_BASE, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Error fetching cart" }
      );
    }
  }
);

// Clear cart
export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (token, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${API_BASE}/clear`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Error clearing cart" }
      );
    }
  }
);

// ------------------ Slice ------------------
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    message: null,
    error: null,
  },
  reducers: {
    resetCartState: (state, action) => {
      if (action.payload) {
        state.items = action.payload;
      } else {
        state.items = [];
        state.loading = false;
        state.message = null;
        state.error = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Update Cart Item
      .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(action.payload.data)) {
          state.items = action.payload.data;
        } else if (action.payload.data) {
          const item = action.payload.data;
          const existing = state.items.find(i => i.productId === item.productId);
          if (existing) {
            existing.quantity = item.quantity;
          } else {
            state.items.push(item);
          }
        }
        state.message = action.payload.message;
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      // Add to cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(action.payload.data)) {
          // Backend returns full cart
          state.items = action.payload.data;
        } else if (action.payload.data) {
          // Backend returns single item
          const item = action.payload.data;
          const existing = state.items.find(i => i.productId === item.productId);
          if (existing) {
            existing.quantity = item.quantity;
          } else {
            state.items.push(item);
          }
        }
        state.message = action.payload.message;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      // Get Cart
      .addCase(getCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(action.payload.data)) {
          state.items = action.payload.data;
        }
        state.message = action.payload.message;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      // Clear Cart
      .addCase(clearCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = [];
        state.message = action.payload.message;
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { resetCartState } = cartSlice.actions;
export default cartSlice.reducer;
