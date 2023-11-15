import React from 'react';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { useAppSelector } from '../hooks/store';
import { TiShoppingCart } from 'react-icons/ti';
import { useTheme } from '@emotion/react';

/**
 * CartIconButton component displays a shopping cart icon with a badge showing the number of items in the cart.
 *
 * @returns {JSX.Element} - The rendered CartIconButton component.
 */
const CartIconButton = () => {
  const cartItems = useAppSelector((state) => state.cart.items);

  return (
    <IconButton 
        color="inherit" 
        sx={{ 
            '&:hover': { 
                color: useTheme().palette.primary.hover,
                transition: 'color 0.2s ease-in-out'
                } 
            }}
    >
      <Badge badgeContent={cartItems.length.toString()} color="error">
        <TiShoppingCart />
      </Badge>
    </IconButton>
  );
};

export default CartIconButton;
