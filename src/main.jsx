import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {Provider} from 'react-redux'
import {store} from "./store/store.js"
import './assets/styles/index.css'
import { CartProvider } from './components/contexts/CartContext.jsx'
import { WishProvider } from './components/contexts/WishContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store = {store}>

        <CartProvider>
          <WishProvider>
            <App />
          </WishProvider>
        </CartProvider>
      </Provider>
  </React.StrictMode>,
)
