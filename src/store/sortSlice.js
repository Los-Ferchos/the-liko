import { createSlice } from "@reduxjs/toolkit";

/**
 * Redux slice for managing sorting and filtering state.
 */
export const sortSlice = createSlice({
    name: "sort",
    initialState: {
        send: false,
        isSelected: false,
        filtersSelected: [],
        sortSelected: [],
    },
    reducers: {
        /**
         * Toggles the send state between true and false.
         * @param {Object} state - The current state.
         */
        sendOrders(state) {
            state.send = !state.send;
        },

        /**
         * Sets the isSelected state to the specified value.
         * @param {Object} state - The current state.
         * @param {boolean} action.payload - The new value for isSelected.
         */
        setSelected(state, action) {
            state.isSelected = action.payload;
        },

        /**
         * Sets the filtersSelected state to the specified array of filters.
         * @param {Object} state - The current state.
         * @param {Array<string>} action.payload - The array of filters to set.
         */
        setFiltersSelected(state, action) {
            state.filtersSelected = action.payload;
        },

        /**
         * Sets the sortSelected state to the specified array of sort options.
         * @param {Object} state - The current state.
         * @param {Array<string>} action.payload - The array of sort options to set.
         */
        setSortSelected(state, action) {
            state.sortSelected = action.payload;
        },

        /**
         * Adds a filter to the filtersSelected array if it doesn't already exist.
         * @param {Object} state - The current state.
         * @param {string} action.payload - The filter to add.
         */
        addFilter(state, action) {
            const array = state.filtersSelected;
            for (let index = 0; index < array.length; index++) {
                if (array[index] === action.payload) {
                    return;
                }
            }
            state.filtersSelected.push(action.payload);
        },

        /**
         * Removes a filter from the filtersSelected array.
         * @param {Object} state - The current state.
         * @param {string} action.payload - The filter to remove.
         */
        removeFilter(state, action) {
            const array = state.filtersSelected;
            const newArray = array.filter((item) => item !== action.payload);
            state.filtersSelected = newArray;
        },

        /**
         * Removes a filter from the filtersSelected array.
         * @param {Object} state - The current state.
         * @param {string} action.payload - The filter to remove.
         */
        removeFilterFromIndex(state, action) {
            const array = state.filtersSelected;
            var newArray = [];
            var counter = 0;
            for (let i = 0; i < array.length; i++) {
                if (i != action.payload) {
                    newArray[counter];
                    counter++;
                }
            }
            state.filtersSelected = newArray;
        },

        /**
         * Clears all filters and sort options.
         * @param {Object} state - The current state.
         */
        clearAll(state) {
            state.filtersSelected = [];
            state.sortSelected = [];
        },
    },
});

export const {
    sendOrders,
    setSelected,
    setFiltersSelected,
    setSortSelected,
    addFilter,
    removeFilter,
    removeFilterFromIndex,
    clearAll,
} = sortSlice.actions;
export default sortSlice.reducer;
