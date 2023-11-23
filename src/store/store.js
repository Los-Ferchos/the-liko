import { configureStore } from "@reduxjs/toolkit";

import categorySlice from './categorySlice';
import subcategorySlice from "./subcategorySlice";
import cartSlice from "./cartSlice";
import sortSlice from "./sortSlice";
import searchSlice from "./searchSlice";
import userSlice from "./userSlice";

/**
 * @typedef {Object} RootState
 * @property {Object} categories - The state slice for categories.
 * @property {Object} subcategories - The state slice for subcategories.
 * @property {Object} cart - The state slice for the shopping cart.
 */

export const store = configureStore({
  reducer: {
    categories: categorySlice,
    subcategories: subcategorySlice,
    cart: cartSlice,
    sort: sortSlice,
    search: searchSlice,
    user: userSlice
  },
});
