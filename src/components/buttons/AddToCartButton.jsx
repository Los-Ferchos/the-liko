import { Button } from '@mui/material';
import { FaShoppingCart } from 'react-icons/fa';

/**
 * Button component for adding a product to the shopping cart.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.productId - The unique identifier of the product to be added to the cart.
 * 
 * @returns {JSX.Element} Rendered AddToCartButton component.
 */
const AddToCartButton = ({ productId }) => {

  /**
   * Method to be called to manage a product addition to wish list
  */
  const addProductToCart = () => {
    console.log(productId + " clicked to add to cart")
  }
    
  return (
    <Button
      variant="outlined"
      color="primary"
      onClick={addProductToCart}
      startIcon={<FaShoppingCart />}
    >
      Add to Cart
    </Button>
  );
};

export default AddToCartButton;
