import { Button } from '@mui/material';
import { FaShoppingCart } from 'react-icons/fa';
import { useGlobalCart } from '../contexts/CartContext';

/**
 * Button component for adding a product to the shopping cart.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.product - The product to be added to the cart.
 * 
 * @returns {JSX.Element} Rendered AddToCartButton component.
 */
const AddToCartButton = ({ product }) => {
  const { cartItems, addProductToCart, updateQuantity, removeProductFromCart, clearShoppingCart } = useGlobalCart();

  /**
   * Method to be called to manage a product addition to wish list
  */
  const addProductItemToCart = () => {
    {
      try{
      } catch(e){
        console.log(e)
      }
    }
    console.log(cartItems)
  }
    
  return (
    <Button
      variant="outlined"
      color="primary"
      onClick={() => addProductToCart(product, 1)}
      startIcon={<FaShoppingCart />}
    >
      Add to Cart
    </Button>
  );
};

export default AddToCartButton;
