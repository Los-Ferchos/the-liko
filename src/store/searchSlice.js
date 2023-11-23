import { createSlice } from "@reduxjs/toolkit";

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
        }
    },
});

export const { setSearchText, setSearch } = searchSlice.actions;
export default searchSlice.reducer;