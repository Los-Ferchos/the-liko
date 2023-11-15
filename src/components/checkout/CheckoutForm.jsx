import {PaymentElement, CardElement} from '@stripe/react-stripe-js';
import {TextField, Typography, Tab, Box} from '@mui/material';
import { useState } from 'react';
import '../../assets/styles/checkout.css'
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const CheckoutForm = () => {
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [telephone, setTelephone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const {nit, setNit} = useState('');

  const [value, setValue] = useState('1');

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
          <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Credit Card" value="1" />
                <Tab label="QR" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1"><PaymentElement/></TabPanel>
            <TabPanel value="2">Item Two</TabPanel>
          </TabContext>
          </Box>
      </div>
     
    </form>
  );
};

export default CheckoutForm;