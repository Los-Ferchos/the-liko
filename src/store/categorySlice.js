import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
    name: "categories",
    initialState: {
      categories: [],
    },
    reducers: {
      addCategory(state, action) {
        state.categories.push(action.payload);
      },
      setCategories(state, action) {
        state.categories = action.payload;
      }
    },
});


export const { addCategory, setCategories } = categorySlice.actions;
export default categorySlice.reducer;