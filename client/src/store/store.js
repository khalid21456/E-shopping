import { configureStore } from "@reduxjs/toolkit";
import categorieReducer from "../slices/categorieSlice.js";

export const store = configureStore({
  reducer: {
    data: categorieReducer,
  },
});
