import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, Card } from '@mui/material';
import '../../assets/styles/verificationModal.css';
import { API_URL_LINK } from '../../utils/constants';
import BottleLoader from '../loaderAnimations/bottleLoader';
import { useDispatch } from 'react-redux';
import { useGlobalCart } from '../contexts/CartContext';
import { userSlice } from '../../store/userSlice';
import { Link, useNavigate } from 'react-router-dom';

/**
 * Represents a verification modal component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {boolean} props.open - Whether the modal is open or not.
 * @param {Function} props.onClose - The function to close the modal.
 * @param {string} props.token - The verification token.
 * @returns {JSX.Element} The verification modal component.
 */
const VerificacionModal = ({ open, onClose, token }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setUserLogged, setCartItems, uploadCartToDatabase } = useGlobalCart();
  const [codigo, setCodigo] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (index, value) => {
    if ((/^[a-zA-Z0-9]$/.test(value) || value === '') && index >= 0 && index < 6) {
      const newCodigo = [...codigo];
      newCodigo[index] = value.toUpperCase();
      setCodigo(newCodigo);
    }
  };

  const logIn = async (data) => {
    dispatch(userSlice.actions.loginUser(data));
    await uploadCartToDatabase(data);
    setCartItems([]);
  };

  const sendCodeVerication = async () => {
    setIsLoading(true);
    setErrorMessage('');
    const code = codigo.join('');
    if (code.length < 6) {
      setErrorMessage('Please enter a valid code');
      setIsLoading(false);
      return;
    } else {
      try {
        const response = await fetch(`${API_URL_LINK}/confirm_register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token, codeVerification: code }),
        });
        if (response.status === 201) {
          const data = await response.json();
          logIn(data);
          setIsLoading(false);
          navigate(-1)
          onClose();
          
        } else {
          setErrorMessage('Please enter a valid code');
          setIsLoading(false);
          return;
        }
      } catch {
        setErrorMessage('Please enter a valid code');
        setIsLoading(false);
        return;
      }
    }
  };


  return (
    <Modal
  open={open}
  onClose={onClose}
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <Box 
    sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh' 
    }}
  >
    <Card className='modal-container'>
      <Typography variant="h5" align='center' sx={{color: 'primary.main', fontWeight: 'bold'}}  >
       Enter your verification code
      </Typography>
      <Typography  sx={{ mt: 2 }}>
        We sent a 6-digit code to your email. Enter it below to confirm your email address.<br/>The code sent is valid for 10 minutes.
    </Typography>
      <Box className='box-letters' >
        {codigo.map((digit, index) => (
          <TextField
            key={index}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            variant="outlined"
            size="small"
            inputProps={{ maxLength: 1, style: { textAlign: 'center' } }}
          />
        ))}
      </Box>
      <Typography variant='body1' className='description-text' align='center' sx={{color: 'primary.main'}}>
            {errorMessage}
        </Typography>
      {isLoading?<BottleLoader/>:
      (<div className='modal-buttons'>
      <Button className='button-modal' variant='outlined' onClick={onClose} sx={{ mt: 2 }}>
        Cancel
      </Button>
      <Button  className='button-modal' variant='contained' onClick={sendCodeVerication} sx={{ mt: 2 }}>
        Confirm
      </Button>
      </div>)}
    </Card>
  </Box>
</Modal>
  );
};

export default VerificacionModal;
