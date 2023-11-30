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
    currency: "",
    loading: false
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
      state.currency = action.payload;
    },

    /**
     * Reducer function for changing the loading state.
     * @function
     * @name changeLoading
     * @param {string} state - The current state (current loading).
     * @param {Object} action - The Redux action containing the new loading payload.
     */
    changeLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { changeCurrency, changeLoading } = locationSlice.actions;
export default locationSlice.reducer;
