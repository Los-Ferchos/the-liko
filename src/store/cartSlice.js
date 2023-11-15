import { createSlice } from '@reduxjs/toolkit';

/**
 * @typedef {Object} Price
 * @property {number} value - The value of the price.
 * @property {string} currency - The currency of the price.
 */

/**
 * @typedef {Object} ProductInfo
 * @property {number} _id - The unique identifier of the product.
 * @property {string} name - The name of the product.
 * @property {string} description - The description of the product.
 * @property {number} rating - The rating of the product.
 * @property {number} totalReviews - The total number of reviews for the product.
 * @property {number} sells - The total number of sells for the product.
 * @property {number} quantity - The quantity of the product.
 * @property {string} imgUrl - The URL of the product image.
 * @property {string} category - The category of the product.
 * @property {string} subcategory - The subcategory of the product.
 * @property {Object} details - Additional details about the product.
 * @property {number} details.abv - The alcohol by volume percentage.
 * @property {string} details.brand - The brand of the product.
 * @property {string} details.type - The type of the product.
 */

/**
 * @typedef {Object} CartItem
 * @property {string} id - The unique identifier of the cart item.
 * @property {string} userId - The identifier of the user who added the item to the cart.
 * @property {number} quantity - The quantity of the item in the cart.
 * @property {ProductInfo} productInfo - Details about the product in the cart.
 */

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    
    /**
     * Action to set the entire state of the cart.
     *
     * @param {Object} state - The current state of the cart.
     * @param {Object} action - The action object containing the payload.
     * @param {Array} action.payload - The new state of the cart.
     */
    setCartState: (state, action) => {
      state.items = action.payload;
    },
      
    /**
     * Action to add an item to the cart.
     *
     * @param {Object} state - The current state of the cart.
     * @param {Object} action - The action object containing the payload.
     * @param {CartItem} action.payload - The item to be added to the cart.
     */
    addItemToCart: (state, action) => {
      const newItem = action.payload;
      state.items.push(newItem);
    },

    /**
     * Action to remove an item from the cart.
     *
     * @param {Object} state - The current state of the cart.
     * @param {Object} action - The action object containing the payload.
     * @param {string} action.payload - The id of the item to be removed from the cart.
     */
    removeItemFromCart: (state, action) => {
      const itemIdToRemove = action.payload;
      state.items = state.items.filter(item => item.productInfo._id !== itemIdToRemove);
    },

    /**
     * Action to update the quantity of an item in the cart.
     *
     * @param {Object} state - The current state of the cart.
     * @param {Object} action - The action object containing the payload.
     * @param {Object} action.payload - The payload containing itemId and newQuantity.
     * @param {string} action.payload.itemId - The id of the item to be updated.
     * @param {number} action.payload.newQuantity - The new quantity for the item.
     */
    updateCartItemQuantity: (state, action) => {
      const { itemId, newQuantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.productInfo._id === itemId);
      if (itemToUpdate) {
        itemToUpdate.quantity = newQuantity;
      }
    },

    /**
     * Action to clear all items from the cart.
     *
     * @param {Object} state - The current state of the cart.
     */
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  setCartState,
  addItemToCart,
  removeItemFromCart,
  updateCartItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
