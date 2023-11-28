import React from 'react'
import { useGlobalCart } from '../contexts/CartContext';
import { API_URL_LINK } from '../../utils/constants';
import { useState, useEffect } from 'react';

function FavoritesSection() {
    const [loading, setLoading] = useState(true);
    const { userLogged } = useGlobalCart();
    const [wishlist, setWishlist] = useState(null);

    console.log(userLogged)
    useEffect(() => {
        const fetchWishlist = async () => {
          setLoading(true)
          try {
            const response = await fetch(`${API_URL_LINK}/wishlist/${userLogged.userId}`);
            const data = await response.json();
            if (response.ok) {
                setWishlist(data.wishlist);
            }
          } catch (error) {
            console.error('Error fetching orders:', error);
          }
          setLoading(false)
        };
        
        fetchWishlist();
      }, [wishlist]);

    return (
        <div>{/**wishlist.map((item) => {item})*/}</div>
    )
}

export default FavoritesSection