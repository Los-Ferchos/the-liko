import { createSlice } from "@reduxjs/toolkit";

export const subcategorySlice = createSlice({
    name: "subcategories",
    initialState: {
      subcategories: [],
    },
    reducers: {
        addSubcategory(state, action) {
            state.subcategories.push(action.payload);
        },
        setSubcategories(state, action) {
            state.subcategories = action.payload;
        },
        /**
         * Reducer function for changing the loading state.
         * @function
         * @name changeLoading
         * @param {string} state - The current state (current loading).
         * @param {Object} action - The Redux action containing the new loading payload.
        */
        changeLoadingSubcategories(state, action) {
            state.loading = action.payload;
        },
    },
});

export const { addSubcategory, setSubcategories, changeLoadingSubcategories } = subcategorySlice.actions;
export default subcategorySlice.reducer;