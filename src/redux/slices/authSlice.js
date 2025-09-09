// src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://192.168.0.210:8080/api";

// ---------------------- REGISTER (Admin/User) ----------------------
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/register`, formData);

      if (data.success && data.data?.token) {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data));
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Register failed");
    }
  }
);

// ---------------------- LOGIN (Admin/User) ----------------------
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.post(`${API_URL}/login`, formData);

      if (data.success && data.data?.token) {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data));

        // Fetch profile immediately after login
        await dispatch(fetchProfile(data.data.token));
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// ---------------------- FETCH PROFILE ----------------------
export const fetchProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (token, { rejectWithValue }) => {
    try {
      const authToken = token || localStorage.getItem("token");
      if (!authToken) throw new Error("No token found");

      const { data } = await axios.get(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to fetch profile"
      );
    }
  }
);

// ---------------------- SLICE ----------------------
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      state.message = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    clearAuthState: (state) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.user = action.payload.data;
        state.token = action.payload.data?.token || null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.user = action.payload.data;
        state.token = action.payload.data?.token || null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Fetch Profile
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data; // update user with full profile
        state.message = action.payload.message;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearAuthState } = authSlice.actions;
export default authSlice.reducer;
