import { IconButton } from '@mui/material'
import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa'

const WishButton = ({ productId }) => {
  const [alreadyWished, setAlreadyWished] = useState(false);

  /**
   * Method to be called to manage a product addition to wish list
   */
  const addProductToWishList = () => {
    // setAlreadyWished(true);
    console.log(productId + " clicked to add to wish list")
  }

   /**
   * Method to be called to manage a product deletion from wish list
   */
   const deleteProductToWishList = () => {
    // setAlreadyWished(false);
    console.log(productId + " clicked to delete from wish list")
  }

  return (
    <IconButton color='primary' onClick={alreadyWished ? deleteProductToWishList : addProductToWishList} >
        {
            alreadyWished ? 
                <FaHeart /> : 
                <FaRegHeart />
        }
    </IconButton>
  )
}

export default WishButton