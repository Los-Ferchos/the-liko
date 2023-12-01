import React from 'react'
import { useGlobalCart } from '../contexts/CartContext';
import { API_URL_LINK } from '../../utils/constants';
import { useState, useEffect } from 'react';
import WishItem from '../products/wishlist/WishItem';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const WishlistSection = () => {
  const [loading, setLoading] = useState(true);
  const { userLogged } = useGlobalCart();
  const [wishlist, setWishlist] = useState();
  const navigate = useNavigate();

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
        loading ? (<div className="full-centered-container"><span className="fast-loader"></span></div>):
        (!wishlist || wishlist === undefined || wishlist.lenght === 0) ?
          <div className='no-items'>
            <Typography variant='h5' color='black' component='h1' style={{ fontWeight: "bold" }} marginBottom={6}>No Items in Wishlist</Typography>
            <Button variant='outlined' style={{ marginTop: 10 }} onClick={() => {
              navigate("/products")
            }}>Continue Navigating</Button>
          </div>
          :
          (
            <div style={{ width: '90%' }}>
              <Typography variant="h5" color={'primary'} fontWeight={'bold'} marginBottom={10}>
                Wishlist
              </Typography>
              {wishlist.map((item) => (
                <WishItem key={item.productId} productId={item.productId} />
              ))}
            </div>
          )
      }
    </>
  )
}

export default WishlistSection