import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base API URL
const BASE_URL = "http://192.168.0.210:8080/api";

// ------------------- Thunks -------------------

// 1️⃣ Add review (authenticated user)
export const addReview = createAsyncThunk(
  "reviews/addReview",
  async ({ productId, rating, comment, token }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/${productId}/reviews`,
        { rating, comment },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// 2️⃣ Get reviews for a product
export const getReviewsByProduct = createAsyncThunk(
  "reviews/getReviewsByProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/${productId}/reviews`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// 3️⃣ Get all reviews (admin)
export const getAllReviews = createAsyncThunk(
  "reviews/getAllReviews",
  async (token, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/allreviews`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ------------------- Slice -------------------
const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    productReviews: [],
    allReviews: [],
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearReviewState: (state) => {
      state.productReviews = [];
      state.allReviews = [];
      state.loading = false;
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    // Add Review
    builder
      .addCase(addReview.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
        state.productReviews.unshift(action.payload.data);
      })
      .addCase(addReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get Reviews By Product
    builder
      .addCase(getReviewsByProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReviewsByProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.productReviews = action.payload.data;
      })
      .addCase(getReviewsByProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get All Reviews (Admin)
    builder
      .addCase(getAllReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.allReviews = action.payload.data;
      })
      .addCase(getAllReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearReviewState } = reviewSlice.actions;
export default reviewSlice.reducer;
