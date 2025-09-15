import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/bestsellers/`;

/* ================================
   🔹 ASYNC THUNKS (CRUD)
================================ */

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

// ✅ Create bestseller (form-data)
export const createBestseller = createAsyncThunk(
  "bestsellers/create",
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("Admin token missing");

      const response = await axios.post(`${API_URL}add`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        return {
          data: response.data.data,
          message: response.data.message || "Created successfully",
        };
      }
      return rejectWithValue(response.data.message);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create bestseller"
      );
    }
  }
);

// ✅ Update bestseller (form-data)
export const updateBestseller = createAsyncThunk(
  "bestsellers/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("Admin token missing");

      const response = await axios.put(`${API_URL}${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        return {
          data: response.data.data,
          message: response.data.message || "Updated successfully",
        };
      }
      return rejectWithValue(response.data.message);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update bestseller"
      );
    }
  }
);

// ✅ Delete bestseller
export const deleteBestseller = createAsyncThunk(
  "bestsellers/delete",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("Admin token missing");

      const response = await axios.delete(`${API_URL}${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        return {
          id,
          message: response.data.message || "Deleted successfully",
        };
      }
      return rejectWithValue(response.data.message);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete bestseller"
      );
    }
  }
);

/* ================================
   🔹 SLICE
================================ */
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
      /* ---------- Fetch all ---------- */
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

      /* ---------- Fetch single ---------- */
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

      /* ---------- Create ---------- */
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
      })

      /* ---------- Update ---------- */
      .addCase(updateBestseller.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateBestseller.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
        state.bestseller = action.payload.data;
        // update in items array
        state.items = state.items.map((item) =>
          item._id === action.payload.data._id ? action.payload.data : item
        );
      })
      .addCase(updateBestseller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      /* ---------- Delete ---------- */
      .addCase(deleteBestseller.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteBestseller.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
        // remove from list
        state.items = state.items.filter((item) => item._id !== action.payload.id);
        // clear selected if deleted
        if (state.bestseller && state.bestseller._id === action.payload.id) {
          state.bestseller = null;
        }
      })
      .addCase(deleteBestseller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { clearBestsellersState } = bestsellersSlice.actions;
export default bestsellersSlice.reducer;
