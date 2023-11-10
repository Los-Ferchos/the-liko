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
        }
    },
});

export const { addSubcategory, setSubcategories } = subcategorySlice.actions;
export default subcategorySlice.reducer;