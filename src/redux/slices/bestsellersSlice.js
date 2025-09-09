// src/redux/slices/bestsellersSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://192.168.0.210:8080/api/bestsellers/";

// ✅ Fetch all bestsellers
export const fetchBestsellers = createAsyncThunk(
  "bestsellers/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      if (response.data.success) {
        return {
          data: response.data.data,
          message: response.data.message || "Fetched successfully",
        };
      }
      return rejectWithValue(response.data.message);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ✅ Fetch single bestseller by ID
export const fetchBestsellerById = createAsyncThunk(
  "bestsellers/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}${id}`);
      if (response.data.success) {
        return {
          data: response.data.data,
          message: response.data.message || "Fetched successfully",
        };
      }
      return rejectWithValue(response.data.message);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch bestseller"
      );
    }
  }
);

// ✅ Create bestseller
export const createBestseller = createAsyncThunk(
  "bestsellers/createBestseller",
  async ({ formData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("Admin token missing");

      console.log("👉 Thunk started, formData:", formData);

      const response = await axios.post(`${API_URL}add`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("👉 API response:", response.data);

      if (response.data.success) {
        return {
          data: response.data.data,
          message: response.data.message || "Created successfully",
        };
      }
      return rejectWithValue(response.data.message);
    } catch (error) {
      console.error("❌ Create Bestseller Error:", error.response || error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to create bestseller"
      );
    }
  }
);

const bestsellersSlice = createSlice({
  name: "bestsellers",
  initialState: {
    items: [],
    bestseller: null,
    loading: false,
    error: null,
    success: false,
    message: "",
  },
  reducers: {
    clearBestsellersState: (state) => {
      state.items = [];
      state.bestseller = null;
      state.loading = false;
      state.error = null;
      state.success = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchBestsellers.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchBestsellers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
        state.message = action.payload.message;
        state.success = true;
      })
      .addCase(fetchBestsellers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // Fetch single
      .addCase(fetchBestsellerById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.bestseller = null;
      })
      .addCase(fetchBestsellerById.fulfilled, (state, action) => {
        state.loading = false;
        state.bestseller = action.payload.data;
        state.message = action.payload.message;
        state.success = true;
      })
      .addCase(fetchBestsellerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
        state.bestseller = null;
      })

      // Create
      .addCase(createBestseller.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createBestseller.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.bestseller = action.payload.data;
        state.items.push(action.payload.data);
        state.message = action.payload.message;
      })
      .addCase(createBestseller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { clearBestsellersState } = bestsellersSlice.actions;
export default bestsellersSlice.reducer;
