import { IconButton } from '@mui/material'
import { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { useDispatch } from 'react-redux';
import { addLikedProduct, removeLikedProduct } from '../../store/whishListSlice';
import { useGlobalCart } from '../contexts/CartContext';
import { useAppSelector } from '../hooks/store';

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
  const [isLogged, setLogged] = useState(false);
  const { userLogged } = useGlobalCart();
  const wishListStorage = useAppSelector((state) => state.wish.wishList);


 /**
   * useEffect to update logged state and check if the product is in the wishlist
   * when the user login status changes.
   *
   * @param {boolean} userLogged - The current user login status.
   */
 useEffect(() => {
  setLogged(userLogged);

  // Check if the product is in the wishlist
  for (let i = 0; i < wishListStorage.length; i++) {
    const element = wishListStorage[i];
    if (element === productId) {
      setAlreadyWished(true);
    }
  }
}, [userLogged]);

/**
 * useEffect to check if the product is already in the wishlist
 * when the component mounts.
 */
useEffect(() => {
  // Check if the product is in the wishlist
  for (let i = 0; i < wishListStorage.length; i++) {
    const element = wishListStorage[i];
    if (element === productId) {
      setAlreadyWished(true);
    }
  }
}, []);

  /**
   * Method to be called to manage a product addition to wish list
   */
  const addProductToWishList = () => {
    setAlreadyWished(true);
    dispatch(addLikedProduct(productId))
    if (isLogged) {
      try {
        const uploadWishUser = async () => {
          const requestOptions = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userLogged.userId,
                productId: productId
            }),
        };
    
        await fetch(`https://apitheliko.azurewebsites.net/wishlist`, requestOptions);
        }

        uploadWishUser();
      } catch (error) {
        console.log(error)
      }
    }
  }

   /**
   * Method to be called to manage a product deletion from wish list
   */
   const deleteProductToWishList = () => {
    setAlreadyWished(false);
    dispatch(removeLikedProduct(productId));
    if (isLogged) {
      try {
        const deleteWishProduct = async () => {
          const requestOptions = {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            }
        };
    
        await fetch(`https://apitheliko.azurewebsites.net/wishlist/${userLogged.userId}/${productId}`, requestOptions);
        }

        deleteWishProduct();
      } catch (error) {
        console.log(error)
      }
    }
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