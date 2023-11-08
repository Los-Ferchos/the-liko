import { Button } from '@mui/material';
import { FaShoppingCart } from 'react-icons/fa';

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
