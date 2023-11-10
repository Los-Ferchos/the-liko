import { configureStore } from "@reduxjs/toolkit";
import categorySlice from './categorySlice';
import subcategorySlice from "./subcategorySlice";

export const store = configureStore({
  reducer: {
    categories: categorySlice,
    subcategories: subcategorySlice,
  },
});

 