import { Button } from '@mui/material';
import { useGlobalCart } from '../contexts/CartContext';
import { useState } from 'react';
import { BsCart3, BsCartCheckFill } from 'react-icons/bs';
import { MdShoppingCartCheckout } from 'react-icons/md';

/**
 * Button component for adding a product to the shopping cart.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.product - The product to be added to the cart.
 * 
 * @returns {JSX.Element} Rendered AddToCartButton component.
 */
const AddToCartButton = ({ product }) => {
  const { cartItems, addProductToCart } = useGlobalCart();
  const [loading, setLoading] = useState(false);

  /**
   * Method to be called to manage a product addition to wish list
  */
  const addProductItemToCart = () => {
    setLoading(true);
    try{
      addProductItemToCart(product, 1);
    } catch(e){
      alert("There was an error adding the product to cart" + e.message)
    }
    setLoading(false);
  }

  const isAdded = cartItems.some(item => item.productInfo._id === product._id);
    
  return (
    <>
      {
        loading ? (
          <Button
            variant="outlined"
            color="primary"
            disabled
            style={{ borderColor: '#F00', color: "#F00"}}
            onClick={() => addProductToCart(product, 1)}
            startIcon={<MdShoppingCartCheckout />}
          >
              Adding to Cart &nbsp;&nbsp;<CircularProgress size={16}/>
          </Button>
        ) : isAdded ? (
          <Button
            variant="outlined"
            style={{ borderColor: '#555', color: "#555"}}
            startIcon={<BsCartCheckFill />}
          >
            Added to Cart
          </Button>
        ) : (
          <Button
            variant="outlined"
            color="primary"
            onClick={() => addProductToCart(product, 1)}
            startIcon={<BsCart3 />}
          >
            Add to Cart
          </Button>
        )
      }
    </>
    
  );
};

export default AddToCartButton;
