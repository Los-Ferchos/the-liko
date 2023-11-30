import React from 'react'
import { useGlobalCart } from '../contexts/CartContext';
import { API_URL_LINK } from '../../utils/constants';
import { useState, useEffect } from 'react';
import WishItem from '../products/wishlist/WishItem';

const FavoritesSection = () => {
  const [loading, setLoading] = useState(true);
  const { userLogged } = useGlobalCart();
  const [wishlist, setWishlist] = useState();

  useEffect(() => {
    const fetchWishlist = async () => {
      setLoading(true)
      try {
        const response = await fetch(`${API_URL_LINK}/wishlist/${userLogged.userId}`);
        const data = await response.json();
        if (response.ok) {
          setWishlist(data);
        }
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
      setLoading(false)
    };
    fetchWishlist();
  }, []);


  return (
    <>
      {
        loading ? <div className="full-centered-container"><span className="loader"></span></div> : (
          <div>
            <WishItem productId={"65445fc8e1b4d51d570c9ea2"}></WishItem>
          </div>
        )
      }
    </>
  )
}

export default FavoritesSection