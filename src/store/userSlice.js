import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: {},
    },
    reducers: {
        loginUser(state, action) {
            state.userData = action.payload;
        },
    },
});

export const { loginUser } = userSlice.actions;
export default userSlice.reducer;