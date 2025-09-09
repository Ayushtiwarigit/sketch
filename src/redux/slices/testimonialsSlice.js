import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://192.168.0.210:8080/api/testimonials";

// ✅ Fetch testimonials from API, optionally with limit
export const fetchTestimonials = createAsyncThunk(
  "testimonials/fetchTestimonials",
  async (limit = null, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      let data = response.data.data || [];

      // Slice if limit is provided
      if (limit) {
        data = data.slice(0, limit);
      }

      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ✅ Create testimonial (admin only)
export const createTestimonial = createAsyncThunk(
  "testimonials/createTestimonial",
  async ({ formData, token }, { rejectWithValue }) => {
    try {
      const res = await axios.post(API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.data; // return testimonial object
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ✅ Delete testimonial by ID (admin only)
export const deleteTestimonial = createAsyncThunk(
  "testimonials/deleteTestimonial",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id; // return deleted id
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const testimonialsSlice = createSlice({
  name: "testimonials",
  initialState: {
    items: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
    success: false,
  },
  reducers: {
    clearTestimonialsState: (state) => {
      state.status = "idle";
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Fetch testimonials
      .addCase(fetchTestimonials.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // ✅ Create testimonial
      .addCase(createTestimonial.pending, (state) => {
        state.status = "loading";
        state.success = false;
      })
      .addCase(createTestimonial.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.success = true;
        state.items.unshift(action.payload); // add new testimonial on top
      })
      .addCase(createTestimonial.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // ✅ Delete testimonial
      .addCase(deleteTestimonial.pending, (state) => {
        state.status = "loading";
        state.success = false;
      })
      .addCase(deleteTestimonial.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.success = true;
        state.items = state.items.filter((item) => item._id !== action.payload);
      })
      .addCase(deleteTestimonial.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearTestimonialsState } = testimonialsSlice.actions;
export default testimonialsSlice.reducer;
