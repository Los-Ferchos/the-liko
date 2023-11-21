import { API_URL_LINK } from "../../utils/constants";

/**
 * Custom React hook for managing the shopping cart actions directly with the API.
 *
 * @returns {Object} - An object containing utility methods for managing the actions in the shopping cart.
 * @property {Function} updateQuantity - Method to update the quantity of a product in the shopping cart.
 * @property {Function} removeItem - Method to remove a product from the shopping cart.
 */
const CartActionsManager = () => {
    
    const updateQuantity = async (user, cartItemId, newQuantity) => {
        const options = {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                quantity: newQuantity
            }),
        };
    
        await fetch(`${API_URL_LINK}/cart/${user}/${cartItemId}`, options);
    }

    const removeItem = async (user, cartItemId) => {
        const options = {
            method: 'DELETE',
        };
    
        await fetch(`${API_URL_LINK}/cart/${user}/${cartItemId}`, options);
    }

    return {
        updateQuantity,
        removeItem
    };
}

export default CartActionsManager