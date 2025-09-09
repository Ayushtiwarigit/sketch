import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://192.168.0.210:8080/api/products/";

// Utility to get admin token from localStorage
const getAdminToken = () => {
  return localStorage.getItem("admintoken") || localStorage.getItem("token");
};

// ✅ Fetch all products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      console.log("Fetch Products Response:", response.data);
      if (response.data.success) return response.data;
      return rejectWithValue(response.data.message);
    } catch (error) {
      console.error("Fetch Products Error:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

// ✅ Fetch single product
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}${productId}`);
      console.log("Fetch Product By ID Response:", response.data);
      if (response.data.success) return response.data;
      return rejectWithValue(response.data.message);
    } catch (error) {
      console.error("Fetch Product By ID Error:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch product"
      );
    }
  }
);

// ✅ Create product
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async ({ formData }, { rejectWithValue }) => {
    try {
      const token = getAdminToken();
      if (!token) return rejectWithValue("Admin token missing");

      console.log("Creating Product with token:", token);
      const response = await axios.post(API_URL, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Create Product Response:", response.data);
      if (response.data.success) return response.data;
      return rejectWithValue(response.data.message);
    } catch (error) {
      console.error("Create Product Error:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to create product"
      );
    }
  }
);

// ✅ Update product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const token = getAdminToken();
      if (!token) return rejectWithValue("Admin token missing");

      console.log("Updating Product ID:", id, "with token:", token);
      const response = await axios.patch(`${API_URL}${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Update Product Response:", response.data);
      if (response.data.success) return response.data;
      return rejectWithValue(response.data.message);
    } catch (error) {
      console.error("Update Product Error:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to update product"
      );
    }
  }
);

// ✅ Delete product
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const token = getAdminToken();
      if (!token) return rejectWithValue("Admin token missing");

      console.log("Deleting Product ID:", id, "with token:", token);
      const response = await axios.delete(`${API_URL}${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Delete Product Response:", response.data);
      if (response.data.success) return { id, ...response.data };
      return rejectWithValue(response.data.message);
    } catch (error) {
      console.error("Delete Product Error:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete product"
      );
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    product: null,
    loading: false,
    error: null,
    message: "",
    success: false,
  },
  reducers: {
    clearProducts: (state) => {
      state.products = [];
      state.product = null;
      state.loading = false;
      state.error = null;
      state.message = "";
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data || [];
        state.message = action.payload.message;
        state.success = action.payload.success;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch one
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.data;
        state.message = action.payload.message;
        state.success = action.payload.success;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.products.push(action.payload.data);
        state.product = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.product = action.payload.data;
        state.message = action.payload.message;
        const index = state.products.findIndex(
          (p) => p._id === action.payload.data._id
        );
        if (index !== -1) state.products[index] = action.payload.data;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
        state.products = state.products.filter(
          (p) => p._id !== action.payload.id
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProducts } = productSlice.actions;
export default productSlice.reducer;
