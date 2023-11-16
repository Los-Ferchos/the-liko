
import {TextField, Typography, Tab,Tabs, Button} from '@mui/material';
import { useState , useRef} from 'react';
import '../../assets/styles/checkout.css'
import { API_URL_LINK } from '../../utils/constants';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import ComingSoon from '../ComingSoon';
const CheckoutForm = ({totalCost}) => {
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [telephone, setTelephone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const {nit, setNit} = useState('');


  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);

    if (result.error) {
      // Show error to your customer.
      console.log(result.error.message);
    } else {
      // Send the token to your server.
      // This function does not exist yet; we will define it in the next step.
      // stripeTokenHandler(result.token);
      console.log('Tengo token', result.token);

      const response = await fetch(`${API_URL_LINK}/confirmCheckout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payment_method_data: {
            type: 'card',
            card: {
              token: result.token.id,
            },
          },
          amount: totalCost,
        }),
      });

      if (response.ok) {
        // El pago fue procesado correctamente en el servidor
        console.log('Pago procesado con éxito');
      } else {
        // Manejar un error en la respuesta del servidor
        console.log('Error al procesar el pago en el servidor');
      }
    }
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
                <CardElement />
             </div>}
          {value === 1 && <p><ComingSoon/></p>}
          </div>
         
    </div>
         <Button onClick={handleSubmit} id='button-order' variant='contained' color='primary'>
                Place Order
          </Button>
    </form>
  );
};

export default CheckoutForm;