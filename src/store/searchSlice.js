import { createSlice } from "@reduxjs/toolkit";

/**
 * Redux slice for search-related state.
 *
 * @typedef {Object} SearchState
 * @property {string} searchText - The current search text.
 * @property {boolean} search - Flag indicating whether a search is active or not.
 */

/**
 * Redux slice for search-related state.
 *
 * @type {import("@reduxjs/toolkit").Slice<SearchState>}
 */
export const searchSlice = createSlice({
    name: "search",
    initialState: {
        searchText: "",
        search: false,
    },
    reducers: {
        setSearchText(state, action) {
            state.searchText = action.payload;
        },
        setSearch(state, action){
            state.search = !state.search
        },
        clearSearch(state) {
            state.search = false;
            state.searchText = "";
        }
    },
});

export const { setSearchText, setSearch, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;