import { IconButton } from '@mui/material'
import { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { useDispatch } from 'react-redux';
import { addLikedProduct, removeLikedProduct } from '../../store/whishListSlice';

/**
 * Button component representing adding/removing a product to/from the wish list.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.productId - The unique identifier of the product associated with the button.
 * 
 * @returns {JSX.Element} Rendered WishButton component.
 */
const WishButton = ({ productId }) => {
  const [alreadyWished, setAlreadyWished] = useState(false);
  const dispatch = useDispatch();


  /**
   * Method to be called to manage a product addition to wish list
   */
  const addProductToWishList = () => {
    setAlreadyWished(true);
    dispatch(addLikedProduct(productId))
    console.log(productId + " clicked to add to wish list")
  }

   /**
   * Method to be called to manage a product deletion from wish list
   */
   const deleteProductToWishList = () => {
    setAlreadyWished(false);
    dispatch(removeLikedProduct(productId))
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