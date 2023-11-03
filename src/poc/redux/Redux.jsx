// App.jsx
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import Cart from './Cart';
import CartCurrent from './CartCurrent';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Shopping Cart Example</h1>
        <Cart />
        <br />
        <CartCurrent/>
      </div>
    </Provider>
  );
}

export default App;
