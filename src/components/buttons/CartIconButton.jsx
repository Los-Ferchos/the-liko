import React from 'react';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { TiShoppingCart } from 'react-icons/ti';
import { useTheme } from '@emotion/react';
import { useGlobalCart } from '../contexts/CartContext';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';/**
 * CartIconButton component displays a shopping cart icon with a badge showing the number of items in the cart.
 *
 * @returns {JSX.Element} - The rendered CartIconButton component.
 */
const CartIconButton = () => {
  const { cartItems, isLoadingGettingItems } = useGlobalCart();
  const navigate = useNavigate();

  return (
    <IconButton 
        color="inherit" 
        sx={{ 
            '&:hover': { 
                color: useTheme().palette.primary.hover,
                transition: 'color 0.2s ease-in-out'
                } 
            }}
            onClick={() => {
                navigate('/cart');
            }}
    >
        <Badge 
            badgeContent={
                isLoadingGettingItems 
                ? <CircularProgress color='white' size={10} /> 
                : cartItems.length.toString()
            } 
            color="error"
        >
            <TiShoppingCart />
        </Badge>
    </IconButton>
  );
};

export default CartIconButton;
