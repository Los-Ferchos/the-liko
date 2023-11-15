import React, { useEffect, useState } from 'react';
import { Container, Typography, TextField } from '@mui/material';
import Header from '../components/Header';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../components/checkout/CheckoutForm';
import { API_URL_LINK, STRIPE_KEY } from '../utils/constants';
import '../assets/styles/checkout.css'
import '../assets/styles/index.css'

const stripePromise = loadStripe(STRIPE_KEY);

const Checkout = () => {
  const [clientSecret, setClientSecret] = useState('');
  const amount = 100;
  const currency = 'usd';

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
          throw new Error('Error al obtener el clientSecret');
        }

        const data = await response.json();
        setClientSecret(data.clientSecret);
        console.log('clientSecret después de setClientSecret:', data.clientSecret);
      } catch (error) {
        console.log('Error al obtener el clientSecret:', error);
      }
    };

    const fetchData = async () => {
      await fetchClientSecret();
    };

    fetchData();
  }, [amount, currency, setClientSecret]); 

  return (
    <Container>
      <Header />
      {clientSecret && (
        <div className='container-form'>
          <div className='form'>
            <Typography variant='h4'style={{ fontWeight: "bold"}} >Billing  Details</Typography>
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm />
             </Elements>
          </div>
          <div>
            <h1>Hola-----------------------------------------------____________________________________________</h1>
          </div>
          
        </div>
      )}
    </Container>
  );
};

export default Checkout;
