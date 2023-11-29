import { createSlice } from "@reduxjs/toolkit";

/**
 * Redux slice for managing sorting and filtering state.
 */
export const wishListSlice = createSlice({
    name: "wishStorage",
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
            let auxWishList = []
            for (let i = 0; i < state.wishList.length; i++) {
                if (state.wishList[i] == action.payload) {
                    continue
                }; auxWishList[i] = state.wishList[i]
            }
            state.wishList = auxWishList;
        },

        clearAll(state) {
            state.whishList = [];
        },
    },
});

export const {
    sendOrders,
    clearAll
} = wishListSlice.actions;
export default wishListSlice.reducer;
