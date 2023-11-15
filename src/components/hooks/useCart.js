import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from './store';
import { addItemToCart, clearCart, isProductInCart, removeItemFromCart, setCartState, updateCartItemQuantity } from '../../store/cartSlice';
import useLocalStorage from './useLocalStorage';

const CART_STORAGE_KEY = 'cart';

/**
 * Custom React hook for managing the shopping cart state and localStorage synchronization.
 *
 * @returns {Object} - An object containing utility methods for managing the shopping cart.
 * @property {Array} cartItems - An array of items in the shopping cart.
 * @property {Function} addProductToCart - Method to add a product to the shopping cart.
 * @property {Function} updateQuantity - Method to update the quantity of a product in the shopping cart.
 * @property {Function} removeProductFromCart - Method to remove a product from the shopping cart.
 * @property {Function} clearShoppingCart - Method to clear all items from the shopping cart.
 */
export const useCart = () => {
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useLocalStorage(CART_STORAGE_KEY, []);

  const reduxCartItems = useAppSelector((state) => state.cart.items);

  useEffect(() => {
    dispatch(setCartState(cartItems))
  }, [])

  useEffect(() => {
    setCartItems(reduxCartItems);
  }, [reduxCartItems]);

  /**
   * Method to add a product to the shopping cart.
   *
   * @param {Object} product - The product to be added to the shopping cart.
   */
  const addProductToCart = (product, quantity) => {
    dispatch(addItemToCart({ quantity, productInfo: product }));
  };

  /**
   * Method to update the quantity of a product in the shopping cart.
   *
   * @param {string} itemId - The ID of the product in the shopping cart.
   * @param {number} newQuantity - The new quantity for the product.
   */
  const updateQuantity = (itemId, newQuantity) => {
    dispatch(updateCartItemQuantity({ itemId, newQuantity }));
  };

  /**
   * Method to remove a product from the shopping cart.
   *
   * @param {string} itemId - The ID of the product to be removed from the shopping cart.
   */
  const removeProductFromCart = (itemId) => {
    dispatch(removeItemFromCart(itemId));
  };

  /**
   * Method to clear all items from the shopping cart.
   */
  const clearShoppingCart = () => {
    dispatch(clearCart());
  };

   /**
   * Method to check if a product is already in the cart.
   *
   * @param {string} productId - The ID of the product to check.
   * @returns {boolean} - True if the product is already in the cart, false otherwise.
   */
   const isProductAlreadyInCart = (productId) => {
    return dispatch(isProductInCart({ productId }));
  };

  return {
    cartItems: reduxCartItems,
    addProductToCart,
    updateQuantity,
    removeProductFromCart,
    clearShoppingCart,
    isProductAlreadyInCart
  };
};
