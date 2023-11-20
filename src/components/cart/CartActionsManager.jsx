import { API_URL_LINK } from "../../utils/constants";

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