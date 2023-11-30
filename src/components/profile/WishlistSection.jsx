import React from 'react'
import { useGlobalCart } from '../contexts/CartContext';
import { API_URL_LINK } from '../../utils/constants';
import { useState, useEffect } from 'react';
import WishItem from '../products/wishlist/WishItem';
import { Box, Typography } from '@mui/material';

const WishlistSection = () => {
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
          <div style={{width:'90%'}}>
            <Typography variant="h5" color={'primary'} fontWeight={'bold'} marginBottom={10}>
                Wishlist
              </Typography>
            {wishlist.map((item) => (
              <WishItem key={item.productId} productId={item.productId}/>
            ))}
          </div>
        )
      }
    </>
  )
}

export default WishlistSection