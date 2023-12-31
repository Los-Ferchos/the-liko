
import {TextField, Typography, Tab,Tabs, Button, DialogTitle, DialogActions, Dialog, CircularProgress} from '@mui/material';
import { useState , useRef, useEffect} from 'react';
import '../../assets/styles/checkout.css'
import { API_URL_LINK } from '../../utils/constants';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import ComingSoon from '../ComingSoon';
import { useGlobalCart } from '../contexts/CartContext';
import { sendInvoice } from '../../utils/methods';
import { useNavigate } from 'react-router-dom';

/**
 * A React component that displays a checkout form for a user to enter their payment information.
 *
 * @param {number} totalCost - The total cost of the items in the cart.
 *
 * @return {React.Component} A React component representing the checkout form.
 */
const CheckoutForm = ({totalCost, success, setSuccess}) => {
  
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [telephone, setTelephone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [nit, setNit] = useState('');

  const [isFailed, setIsFailed] = useState(false);
  const [invalidData, setInvalidData] = useState(false);
  const [invalidStock, setInvalidStock] = useState(false);
  const [messageInvalidStock, setMessageInvalidStock] = useState('');

  const [loading, setLoading] = useState(false);
  const [direcctionMessage, setDirecctionMessage] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [telephoneError, setTelephoneError] = useState('');
  const [nitError, setNitError] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [invalidFields, setInvalidFields] = useState(false);

  const navigate = useNavigate();

  const { cartItems, clearShoppingCart, userLogged } = useGlobalCart();


  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    setButtonDisabled(false);
  }, []);
  

  const handleSubmit = async (event) => {
    setButtonDisabled(true);
    event.preventDefault();

    if(FirstName.trim() === '' || LastName.trim() === '' || telephone.trim() === '' || nit.trim() === '' || deliveryAddress.trim() === '') {
      setInvalidData(true);
      setButtonDisabled(false);
      return;
    }

    if(direcctionMessage !== '' || firstNameError !== '' || lastNameError !== '' || telephoneError !== '' || nitError !== '') {
      setInvalidData(true);
      setButtonDisabled(false);
      return;
    }

    if(invalidFields) {
      setInvalidData(true);
      setButtonDisabled(false);
      return;
    }

    if(!await validateUserInformation()) {
      setInvalidData(true);
      setButtonDisabled(false);
      return;
    }

    if (!stripe || !elements) {
      setButtonDisabled(false);
      return;
    }

    setLoading(true);

    const card = elements.getElement(CardElement);
    
    const result = await stripe.createToken(card);

    if (result.error) {
      setInvalidData(true);
      setButtonDisabled(false);
      setLoading(false);
    } else {
      
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

        if(!await registerOrder()) {
          setIsFailed(true);
          setButtonDisabled(false);
          setLoading(false);
          return;
        }

        await clearShoppingCart();
        setSuccess(true)
        sendInvoice(userLogged.userId, nit, cartItems, `${FirstName} ${LastName}`, totalCost)
        setTimeout(() => {
          navigate("/profile?section=Order History")
        }, 1500);
      } else {
        setIsFailed(true)
        setButtonDisabled(false);
      }
      setLoading(false);
    }
  };

  /**
   * Validates the delivery address.
   * If the address is less than 10 characters long, sets the direction message.
   * Otherwise, clears the direction message.
   */
  const validateAdress = () => {
    const addressWithoutSpaces = deliveryAddress.replace(/\s/g, '');

    if (addressWithoutSpaces.length < 10) {
        setDirecctionMessage('The address must be at least 10 characters long excluding spaces');
    } else if (deliveryAddress.trim() === '') {
        setDirecctionMessage('The address is required');
    } else {
        setDirecctionMessage('');
    }
}
  /**
   * Validates the first name input.
   * Sets the first name error message and invalid fields flag based on the validation result.
   */
  const validateFistName = () => {
    const regex = /^[a-zA-Z ]+$/;

    if (FirstName.trim() === '') {
      setFirstNameError('First Name is required');
    } else if (!regex.test(FirstName)) {
      setFirstNameError('First Name should not contain special characters');
    } else {
      setFirstNameError('');
    }
  }

/**
 * Validates the last name input.
 */
const validateLastName = () => {
  const regex = /^[a-zA-Z ]+$/;

  if (LastName.trim() === '') {
    setLastNameError('Last Name is required');
  } else if (!regex.test(LastName)) {
    setLastNameError('Last Name should not contain special characters');
  } else {
    setLastNameError('');
  }
}

  /**
   * Validates the telephone input field.
   */
  const validateTelephone = () => {
    const telephoneWithoutSpaces = telephone.replace(/\s/g, '');

    if (telephoneWithoutSpaces.length < 8) {
        setTelephoneError('Telephone must be at least 8 digits long excluding spaces');
    } else if (telephone.trim() === '') {
        setTelephoneError('Telephone is required');
    } else {
        setTelephoneError('');
    }
}

  /**
   * Validates the Nit value.
   */
  const validateNit = () => {
    if(nit.trim() === '') {
      setNitError('Nit is required')
    }
    else {
      setNitError('')
    }
  }

  /**
   * Validates user information by making a POST request to the server.
   * @returns {Promise<boolean>} A promise that resolves to true if the user information is valid, false otherwise.
   */
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
  
  /**
   * Registers an order by sending a POST request to the server.
   * @returns {Promise<boolean>} A promise that resolves to true if the order is successfully registered, otherwise false.
   */
  const registerOrder = async () => {
    let now = new Date();
    let order = { 
      userId: userLogged.userId,
      date: new Date(),
      time: `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`,
      status: 'delivered',
      address: deliveryAddress,
      items: cartItems.map(item => ({
        productId: item.productInfo._id,
        quantity: item.quantity,
        price: item.productInfo.price
      })),
      taxPercentage: 0,
      totalCost: totalCost,
      currency: cartItems[0].productInfo.price.currency,
    };
  
    try{
      const response = await fetch(`${API_URL_LINK}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });
      
      if (response.status === 201) {
        return true;
      } else {
        const productFailed = await response.json();
        setMessageInvalidStock(productFailed.message);
        setInvalidStock(true);
        return false;
      }
    }catch(error){
       setIsFailed(true);
    }
  }


  return (
    <form className='checkout-form'>
      <Dialog
        open={isFailed || invalidData}
        onClose={() => {
          setIsFailed(false)
          setInvalidData(false);
          setInvalidStock(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {invalidData ? "Please fill the fields with the correct data" :
           invalidStock ? messageInvalidStock : 
          "Error processing payment, please try again"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => {
          setIsFailed(false);
          setInvalidData(false);
        }}>Ok</Button>
        </DialogActions>
      </Dialog>

      <Typography variant='h6' >1. USER INFORMATION</Typography>

      <TextField 
      required label="First Name" size='normal' variant="outlined" helperText={firstNameError} error={firstNameError !== '' }
      onChange={e => {setFirstName(e.target.value); validateFistName();}}  inputProps={{maxLength: 256}} onBlur={validateFistName}/>

      <TextField 
      required label="Last Name" size='normal' variant="outlined" helperText={lastNameError} error={lastNameError !== '' }
      onChange={e => {setLastName(e.target.value); validateLastName();}}  inputProps={{maxLength: 256}} onBlur={validateLastName}/>

      <TextField
       required label="Telephone" value={telephone} size='normal' variant="outlined" type='number' helperText={telephoneError} error={telephoneError !== '' }
       onChange={e => {
        const inputValue = e.target.value.slice(0, 17);
        setTelephone(inputValue);
        validateTelephone();
      }}  onBlur={validateTelephone}/>

      <TextField 
          required label="Delivery Address" size='normal' variant="outlined" onChange={e =>{setDeliveryAddress(e.target.value); validateAdress();} }
          helperText={direcctionMessage} inputProps={{ maxLength: 256 }} error={direcctionMessage !== '' } onBlur={validateAdress}/>
      <TextField 
          required label="NIT" value={nit} size='normal' variant="outlined" type="number" helperText={nitError} error={nitError !== '' }
          onChange={e => { 
            const inputValue = e.target.value.slice(0, 40);
            setNit(inputValue); 
            validateNit(); }} onBlur={validateNit}/>

      <div className='payment-method'>
         <Typography variant='h6' >2. PAYMENT METHOD</Typography>
         <Tabs value={value} onChange={handleChange} variant='fullWidth'>
            <Tab label="Credit or debit card" />
            {/*<Tab label="QR" */}
          </Tabs>
          <div>
          {value === 0 && 
            <div className='card-payment'>
                <CardElement />
             </div>}
          {/*value === 1 && <p><ComingSoon/></p>*/}
          </div>
         
    </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center '}}>
          <Button  onClick={!loading && !success && handleSubmit} id='button-order' variant='contained' color='primary' disabled={buttonDisabled}>
              Place Order
          </Button>
          {loading && <CircularProgress style={{ marginTop: 12 }}/>}
          </div>
          {success && <Typography color="green">Successful Payment</Typography>}
    </form>
  );
};

export default CheckoutForm;