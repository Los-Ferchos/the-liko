import { createSlice } from "@reduxjs/toolkit";

export const sortSlice = createSlice({
    name: "sort",
    initialState: {
        send: false,
        isSelected: false,
        filtersSelected: [],
        sortSelected: []
    },
    reducers: {
        sendOrders(state) {
            state.send = !state.send;
        },
        setSelected(state, action) {
            state.isSelected = action.payload;
        },
        setFiltersSelected(state, action) {
            state.filtersSelected = action.payload;
        },
        setSortSelected(state, action) {
            state.sortSelected = action.payload;
        },
        addFilter(state, action) {
            state.filtersSelected[state.filtersSelected.length] = action.payload;
        },
        removeFilter(state, action) {
            const array = state.filtersSelected;
            const newArray = [];
            for (let index = 0; index < array.length; index++) {
                if (array[index] != action.payload) {
                    newArray[newArray.length] = array[index];
                }
            }
            state.filtersSelected = newArray;
        },

        clearAll(state) {
            state.filtersSelected = [];
            state.sortSelected = [];
        }
        
    },
});

export const { sendOrders, setSelected, setFiltersSelected, setSortSelected, setActualApiLink, addFilter, removeFilter, clearAll } = sortSlice.actions;
export default sortSlice.reducer;