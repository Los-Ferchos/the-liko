import React, { useEffect, useState } from 'react'
import { Container } from '@mui/material'
import Header from "../components/Header"
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from '../components/checkout/CheckoutForm';
import { API_URL_LINK } from "../utils/constants";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51OCBE7IJLm2DQzDdDIUITH16K4zwb5rrxlYjGN4eLieGLIB9E9AaruQQSzYQZbOjAiiHK5nhITmWMqoSByOWynkw006GJSkl1b');

const Checkout = ({amount, currency}) => {

  const [clientSecret, setClientSecret] = useState('pi_3OCG3IIJLm2DQzDd1VLwDQiJ_secret_gkx2dDgsbmWT5DC36RqiNFyUC');

  useEffect(() => {
    const fetchClientSecret = async () => {
      
      try {
        const response = await fetch(`${API_URL_LINK}/codeCheckout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({"amount":100, "currency":"usd"})
        });
        if (!response.ok) {
          throw new Error('Error al obtener el clientSecret');
        }

        const data = await response.json();
        setClientSecret(data.clientSecret);
        console.log(data.clientSecret);
      } catch (error) {
        console.error('Error al obtener el clientSecret:', error);
      }
    };

    fetchClientSecret();
  }, []);
    
  return (
    <Container>
        <Header/>
        <h1>Checkout</h1>
        <Elements stripe={stripePromise} options={{clientSecret}}>
          <CheckoutForm />
        </Elements>
    </Container>
  )
}

export default Checkout