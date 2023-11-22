import { createSlice } from "@reduxjs/toolkit";

export const sortSlice = createSlice({
    name: "sort",
    initialState: {
        isSelected: false,
        actualApiLink: {},
        filtersSelected: [],
        sortSelected: []
    },
    reducers: {
        setSelected(state, action) {
            state.isSelected = action.payload;
        },
        setFiltersSelected(state, action) {
            state.filtersSelected = action.payload;
        },
        setSortSelected(state, action) {
            state.sortSelected = action.payload;
        }
    },
});

export const { setSelected, setFiltersSelected, setSortSelected } = sortSlice.actions;
export default sortSlice.reducer;