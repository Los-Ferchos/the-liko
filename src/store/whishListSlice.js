import { createSlice } from "@reduxjs/toolkit";


export const wishListSlice = createSlice({
    name: "wish",
    initialState: {
        wishList: [],
    },
    reducers: {
        setWishList(state, action) {
            state.wishList = action.payload;
        },

        addLikedProduct(state, action) {
            state.wishList[state.wishList.length] = action.payload;
        },

        removeLikedProduct(state, action) {
            // let auxWishList = []
            // for (let i = 0; i < state.wishList.length; i++) {
            //     if (state.wishList[i] == action.payload) {
            //         continue
            //     }; auxWishList[i] = state.wishList[i]
            // }
            // state.wishList = auxWishList;

            const itemIdToRemove = action.payload;
            state.wishList = state.wishList.filter(item => item !== itemIdToRemove);
        },

        clearAllList(state) {
            state.wishList = [];
        },
    },
});

export const {
    setWishList,
    addLikedProduct,
    removeLikedProduct,
    clearAllList
} = wishListSlice.actions;
export default wishListSlice.reducer;
