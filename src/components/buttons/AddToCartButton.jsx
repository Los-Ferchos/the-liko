import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
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
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  /**
   * Method to be called to manage a product addition to wish list
  */
  const addProductItemToCart = async () => {
    setLoading(true);
    try{
      const res = await addProductToCart(product, 1);
      setError(res.error);
      setErrorMsg(res.message);
    } catch(e){
      setError(true)
      setErrorMsg("There was an error adding the product to cart. Please, try again " + e);
    }
    setLoading(false);
  }

  const isAdded = cartItems.some(item => item.productInfo._id === product._id);
    
  return (
    <>
      <Dialog
        open={error}
        onClose={() => setError(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Error adding product to cart"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {errorMsg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setError(false)}>Ok</Button>
        </DialogActions>
      </Dialog>
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
            onClick={() => addProductItemToCart(product, 1)}
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
