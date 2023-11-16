import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from './store';
import { addItemToCart, clearCart, removeItemFromCart, setCartState, updateCartItemQuantity } from '../../store/cartSlice';
import useLocalStorage from './useLocalStorage';
import { API_URL_LINK } from '../../utils/constants';

const CART_STORAGE_KEY = 'cart';
const USER_ID_KEY = 'userData';

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
  const [userLogged, setUserLogged] = useLocalStorage(USER_ID_KEY, null);

  const reduxCartItems = useAppSelector((state) => state.cart.items);

  useEffect(() => {
    const addToCart = async () => {
      if (userLogged == null) {
        dispatch(setCartState(cartItems));
      } else if(userLogged != undefined) {
        try {
          const response = await fetch(`${API_URL_LINK}/cart/${userLogged.userId}`);
          if (response.ok) {
            const data = await response.json();
            dispatch(setCartState(data))
          } else dispatch(setCartState([]))
        } catch (e) {
            alert("There was an error getting your cart items. Please, reload the page to try again " + e);
        }
      }
    };

    addToCart();
  }, [userLogged]);  

  useEffect(() => {
    if(userLogged == null)
        setCartItems(reduxCartItems);
  }, [reduxCartItems]);

    const uploadLocalStoragedCartItems = () => {
        
    }

    /**
     * Method to upload the cart items to the user's database.
     */
    const uploadCartToDatabase = async (userData) => {
        try {
            if(cartItems.length > 0){
                const requestOptions = {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: userData.userId,
                        cartItems: cartItems.map((item) => ({
                            productId: item.productInfo._id,
                            quantity: item.quantity,
                        })),
                    }),
                };
            
                await fetch(`https://apitheliko.azurewebsites.net/multipleCart`, requestOptions);
            }
        } catch (error) {
            console.error('Error uploading cart items to the user database', error);
        }
        setUserLogged(userData);
    };

  /**
   * Method to add a product to the shopping cart.
   *
   * @param {Object} product - The product to be added to the shopping cart.
   */
  const addProductToCart = async (product, quantity) => {
    try{
        if(userLogged == null){
            const response = await fetch(`${API_URL_LINK}/products/${product._id}`);
            if (response.ok) {
                const data = await response.json();
                if(data.quantity >= quantity){
                    dispatch(addItemToCart({ quantity, productInfo: product }));
                    return { error: false, message: `Success` }
                } else 
                    return { error: true, message: `Not possible to add to cart because ${product.name} has no enough stock.` }
            } 
            return { error: true, message: `There was an error ${e}. Please, try again.` }
        }else {
            const requestOptions = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                userId: userLogged.userId,
                productId: product._id,
                quantity: quantity,
              }),
            };
          
            try {
              const response = await fetch(`${API_URL_LINK}/cart`, requestOptions);
          
              const data = await response.json();
              if (response.ok) {
                  dispatch(addItemToCart({ quantity, productInfo: product }));
                  return { error: false, message: `Success` };
              } else return { error: true, message: data.errors[0].error };
            } catch (e) {
              return { error: true, message: `There was an error ${e}. Please, try again.` };
            }
          }          
    } catch(e){
        return { error: true, message: `There was an error ${e}. Please, try again.` }
    }
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

  return {
    cartItems: reduxCartItems,
    addProductToCart,
    updateQuantity,
    removeProductFromCart,
    clearShoppingCart,
    setUserLogged,
    setCartItems,
    uploadCartToDatabase
  };
};
