import React, { useEffect, useState } from 'react';
import { Container, Typography, TextField, Dialog, DialogTitle, DialogActions, Button } from '@mui/material';
import NewHeader from '../components/header/Header';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../components/checkout/CheckoutForm';
import ProductList from '../components/checkout/ProductsList';
import { API_URL_LINK, STRIPE_KEY } from '../utils/constants';
import '../assets/styles/checkout.css'
import '../assets/styles/index.css'
import { useGlobalCart } from '../components/contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import { useAppSelector } from '../components/hooks/store';

const stripePromise = loadStripe(STRIPE_KEY);

/**
 * A React component that displays a checkout page for a user to review their cart items and enter their payment information.
 *
 * @return {React.Component} A React component representing the checkout page.
 */
const Checkout = () => {
  const [clientSecret, setClientSecret] = useState('');
  const amount = 100 ;
  const currency = 'usd';
  const { cartItems, userLogged } = useGlobalCart();
  const navigate = useNavigate();
  const [messageInButton, setMessageInButton] = useState('');
  const [messageInDialog, setMessageInDialog] = useState('');
  const [success, setSuccess] = useState(false);
  
  let total = 0;
  cartItems.map(cartItem => {
    total += (cartItem.quantity * cartItem.productInfo.price.value)
  })

  const generateRedirecction = () => {
    if(userLogged === null) {
      navigate('/login');
    }
    else if (cartItems.length === 0) {
      navigate('/products');
    } 
  }

  useEffect(() => {
    if(userLogged === null) {
      setMessageInDialog("Please log in to an existing account or register a new one before proceeding with payment");
      setMessageInButton('Login');
    }
    else if (cartItems.length === 0) {
      setMessageInDialog("Please add items to your cart before proceeding with payment");
      setMessageInButton('Shop');
    }
  }, [userLogged, cartItems])


  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await fetch(`${API_URL_LINK}/codeCheckout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount, currency }),
        });
        if (!response.ok) {
          throw new Error('Error with secret client');
        }

        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
          throw new Error('Error with secret client');
      }
    };

    const fetchData = async () => {
      await fetchClientSecret();
    };

    fetchData();
  }, [amount, currency, setClientSecret]); 

  const currencyCode = useAppSelector((state) => state.location.currency);

  return (
    <>
    <Container>
     <NewHeader />
     <Dialog
        open={ userLogged === null || (cartItems.length === 0 && success === false ) }
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        onClose={() => generateRedirecction()}
      >
        <DialogTitle id="alert-dialog-title">
          {messageInDialog}
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => generateRedirecction()}>{messageInButton}</Button>
        </DialogActions>
      </Dialog>
      {clientSecret && (
        <div className='container-form'>
          <div className='form'>
            <Typography variant='h4'style={{ fontWeight: "bold"}} >Billing  Details</Typography>
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm totalCost={total} success={success} setSuccess={setSuccess}/>
             </Elements>
          </div>
          <div className='card-items'>
            <ProductList cartItems={cartItems} total={total} currencyTotal={currencyCode} />
          </div>
        </div>
      )}
    </Container>
    <Footer />
    </>
  );
};

export default Checkout;
