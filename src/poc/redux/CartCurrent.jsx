// CartCurrent.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { selectCartItems } from './cartSlice';

const CartCurrent = () => {
  // Access cart items from the global state
  const cartItems = useSelector(selectCartItems);

  return (
    <div>
      <h2>Cart Items</h2>
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            {item.name} - ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartCurrent;
