import {PaymentElement, CardElement} from '@stripe/react-stripe-js';
import {TextField, Typography, Tab,Tabs, Box} from '@mui/material';
import { useState } from 'react';
import '../../assets/styles/checkout.css'

const CheckoutForm = () => {
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [telephone, setTelephone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const {nit, setNit} = useState('');

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  
  
  return (
    <form className='checkout-form'>
      <Typography variant='h6' >1. DELIBERY ADDRESS</Typography>
      <TextField
      label="First Name"
      size='normal' 
      variant="outlined"
      onChange={e => setFirstName(e.target.value)}
      />

      <TextField
      label="Last Name"
      size='normal' 
      variant="outlined"
      onChange={e => setLastName(e.target.value)}
      />

      <TextField
      label="Telephone"
      size='normal' 
      variant="outlined"
      onChange={e => setTelephone(e.target.value)}
      />

      <TextField
      required
      label="Delivery Address"
      size='normal' 
      variant="outlined"
      onChange={e => setDeliveryAddress(e.target.value)}
      />


      <TextField
      label="NIT"
      size='normal' 
      variant="outlined"
      onChange={e => setNit(e.target.value)}
      />
      <div className='payment-method'>
         <Typography variant='h6' >2. PAYMENT METHOD</Typography>
         <Tabs value={value} onChange={handleChange} variant='fullWidth'>
            <Tab label="Credit card" />
            <Tab label="QR" />
          </Tabs>
          <div>
          {value === 0 && 
            <div className='card-payment'>
            <PaymentElement />
             </div>}
          {value === 1 && <p>QR</p>}
          </div>
    </div>
     
    </form>
  );
};

export default CheckoutForm;