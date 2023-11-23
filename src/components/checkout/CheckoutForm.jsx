
import {TextField, Typography, Tab,Tabs, Button, DialogTitle, DialogActions, Dialog, CircularProgress} from '@mui/material';
import { useState , useRef} from 'react';
import '../../assets/styles/checkout.css'
import { API_URL_LINK } from '../../utils/constants';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import ComingSoon from '../ComingSoon';
import { useGlobalCart } from '../contexts/CartContext';
import { sendInvoice } from '../../utils/methods';
import { useNavigate } from 'react-router-dom';
const CheckoutForm = ({totalCost}) => {
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [telephone, setTelephone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [nit, setNit] = useState('');

  const [isFailed, setIsFailed] = useState(false);
  const [invalidData, setInvalidData] = useState(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [direcctionMessage, setDirecctionMessage] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [telephoneError, setTelephoneError] = useState('');
  const [nitError, setNitError] = useState('');

  const navigate = useNavigate();

  const { cartItems, clearShoppingCart, userLogged } = useGlobalCart();


  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(FirstName.trim() === '' || LastName.trim() === '' || telephone.trim() === '' || nit.trim() === '' || deliveryAddress.trim() === '') {
      setInvalidData(true);
      return;
    }

    if(!await validateUserInformation()) {
      setInvalidData(true);
      return;
    }

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);

    if (result.error) {
      console.log('entro2');
      setInvalidData(true);
    } else {
      setLoading(true);
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
        await clearShoppingCart();
        setSuccess(true)
        sendInvoice(userLogged.userId, nit, cartItems, `${FirstName} ${LastName}`, totalCost)
        setTimeout(() => {
          navigate("/products")
        }, 3000);
      } else {
        setIsFailed(true)
      }
      setLoading(false);
    }
  };

  const validateAdress = () => {
    if(deliveryAddress.length < 10) {
      setDirecctionMessage('The address must be at least 10 characters long')
    } else {
      setDirecctionMessage('')
    }
  }

  const validateFistName = () => {
    if(FirstName.trim() === '') {
      setFirstNameError('First Name is required')
    }
    else {
      setFirstNameError('')
    }
  }

  const validateLastName = () => {
    if(LastName.trim() === '') {
      setLastNameError('Last Name is required')
    }
    else {
      setLastNameError('')
    }
  }

  const validateTelephone = () => {
    if(telephone.trim() === '') {
      setTelephoneError('Telephone is required')
    }
    else {
      setTelephoneError('')

    }
  }

  const validateNit = () => {
    if(nit.trim() === '') {
      setNitError('Nit is required')
    }
    else {
      setNitError('')
    }
  
  }

  const validateUserInformation = async () => {
     try{
      const response = await fetch(`${API_URL_LINK}/validateUserInformation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            FirstName,
            LastName,
            telephone,
            deliveryAddress,
            nit,
         }),
      });

      if (response.ok) {
        return true;
      } else {
        return false;
      }
     }catch(error){
        return false;
      }
  }


  return (
    <form className='checkout-form'>
      <Dialog
        open={isFailed || invalidData}
        onClose={() => {
          setIsFailed(false)
          setInvalidData(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {invalidData ? "Please fill the fields with the correct data" : 
          "Error processing payment, please try again"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => {
          setIsFailed(false);
          setInvalidData(false);
        }}>Ok</Button>
        </DialogActions>
      </Dialog>

      <Typography variant='h6' >1. Delivery ADDRESS</Typography>

      <TextField 
      required label="First Name" size='normal' variant="outlined" helperText={firstNameError} error={firstNameError !== '' }
      onChange={e => {setFirstName(e.target.value); validateFistName();}}  inputProps={{maxLength: 256}} onBlur={validateFistName}/>

      <TextField 
      required label="Last Name" size='normal' variant="outlined" helperText={lastNameError} error={lastNameError !== '' }
      onChange={e => {setLastName(e.target.value); validateLastName();}}  inputProps={{maxLength: 256}} onBlur={validateLastName}/>

      <TextField
       required label="Telephone" size='normal' variant="outlined" type='number' helperText={telephoneError} error={telephoneError !== '' }
       onChange={e =>{ setTelephone(e.target.value); validateTelephone();}}  inputProps={{maxLength: 256}} onBlur={validateTelephone}/>

      <TextField 
          required label="Delivery Address" size='normal' variant="outlined" onChange={e =>{setDeliveryAddress(e.target.value); validateAdress();} }
          helperText={direcctionMessage} inputProps={{ maxLength: 256 }} error={direcctionMessage !== '' } onBlur={validateAdress}/>
      <TextField 
          required label="NIT" size='normal' variant="outlined" type="number" helperText={nitError} error={nitError !== '' }
          onChange={e => { setNit(e.target.value); validateNit(); }} onBlur={validateNit}/>

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
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center '}}>
          <Button onClick={!loading && !success && handleSubmit} id='button-order' variant='contained' color='primary'>
              Place Order
          </Button>
          {loading && <CircularProgress style={{ marginTop: 12 }}/>}
          </div>
          {success && <Typography color="green">Successful Payment</Typography>}
    </form>
  );
};

export default CheckoutForm;