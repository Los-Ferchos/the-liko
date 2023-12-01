import { IconButton } from '@mui/material'
import { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { useAppSelector } from '../hooks/store';
import { useGlobalWish } from '../contexts/WishContext';

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
  const {userWishList, addWish, removeWish } = useGlobalWish();
  const wishListStorage = useAppSelector((state) => state.wish.wishList);



/**
 * useEffect to check if the product is already in the wishlist
 * when the component mounts.
 */
useEffect(() => {
  // Check if the product is in the wishlist
  for (let i = 0; i < userWishList.length; i++) {
    const element = userWishList[i];
    if (element === productId) {
      setAlreadyWished(true);
    }
  }
}, [userWishList, wishListStorage]);

  /**
   * Method to be called to manage a product addition to wish list
   */
  const addProductToWishList = () => {
    setAlreadyWished(true);
    addWish(productId);
  }

   /**
   * Method to be called to manage a product deletion from wish list
   */
   const deleteProductToWishList = () => {
    setAlreadyWished(false);
    removeWish(productId);
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