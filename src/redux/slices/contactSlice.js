import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

// ✅ Send a contact message (user)
export const sendContactMessage = createAsyncThunk(
  "contact/sendMessage",
  async ({ name, email, message }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/contacts`, { name, email, message });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ✅ Fetch all contact messages (admin, with token)
export const fetchContacts = createAsyncThunk(
  "contact/fetchContacts",
  async ({ token } = {}, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/contacts`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    messages: [],
    loading: false,
    successMessage: null,
    error: null,
  },
  reducers: {
    clearContactState: (state) => {
      state.messages = [];
      state.loading = false;
      state.successMessage = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Send message
    builder
      .addCase(sendContactMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(sendContactMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(sendContactMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch contacts
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearContactState } = contactSlice.actions;
export default contactSlice.reducer;
