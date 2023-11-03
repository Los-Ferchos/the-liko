// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [
    // Default item added to cartItems
    { id: 1, name: 'Default Item', price: 10 },
  ],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
        // Reducer function to handle adding items to the cart
        const { id, name, price } = action.payload; // Add the new item to the cart state
        state.cartItems.push({ id, name, price });
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export const selectCartItems = state => state.cart.cartItems;
export default cartSlice.reducer;
