import { createSlice } from "@reduxjs/toolkit";

/**
 * Redux slice for managing the currency state.
 * @module locationSlice
 */

/**
 * The currency slice.
 * @type {Slice}
 * @name locationSlice
 * @memberOf module:locationSlice
 * @inner
 */
export const locationSlice = createSlice({
  /**
   * The name of the slice.
   * @type {string}
   */
  name: "location",

  /**
   * The initial state of the currency slice.
   * @type {string}
   */
  initialState: {
    currency: "USD"
  },

  /**
   * The reducers for the currency slice.
   * @type {Object}
   */
  reducers: {
    /**
     * Reducer function for changing the currency state.
     * @function
     * @name changeCurrency
     * @param {string} state - The current state (current currency).
     * @param {Object} action - The Redux action containing the new currency payload.
     */
    changeCurrency(state, action) {
        console.log(state, action)
      state.currency = action.payload;
    },
  },
});

export const { changeCurrency } = locationSlice.actions;
export default locationSlice.reducer;
