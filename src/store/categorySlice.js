import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
    name: "categories",
    initialState: {
      categories: [],
      loading: true
    },
    reducers: {
      addCategory(state, action) {
        state.categories.push(action.payload);
      },
      setCategories(state, action) {
        state.categories = action.payload;
      },
      /**
       * Reducer function for changing the loading state.
       * @function
       * @name changeLoading
       * @param {string} state - The current state (current loading).
       * @param {Object} action - The Redux action containing the new loading payload.
       */
      changeLoadingCategories(state, action) {
        state.loading = action.payload;
      },
    },
});


export const { addCategory, setCategories, changeLoadingCategories } = categorySlice.actions;
export default categorySlice.reducer;