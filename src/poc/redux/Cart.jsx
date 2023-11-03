// Cart.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, selectCartItems } from './cartSlice';

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  return (
    <div className="cart">
      <h2>Cart</h2>
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            {item.name} - ${item.price}
            <button onClick={() => dispatch(addToCart({id: item.id, name: item.name, price: item.price}))}>Add</button>
            <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cart;
