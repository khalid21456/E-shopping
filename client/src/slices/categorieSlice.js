import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const HOST = import.meta.env.VITE_SERVER_HOST;
const PORT = import.meta.env.VITE_SERVER_PORT; 

// Async thunk to fetch data
export const fetchData = createAsyncThunk("data/fetchData", async () => {
  const response = await axios.get(`http://${HOST}:${PORT}/eshop/categorie/get`); // your API endpoint
  console.log(response.data)  
  return response.data;
});

const dataSlice = createSlice({
  name: "data",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default dataSlice.reducer;
