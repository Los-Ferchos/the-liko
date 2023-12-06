import React, { useState, useEffect } from 'react';
import { Typography, Grid, TextField, Card, CardContent, Button, IconButton, InputAdornment } from '@mui/material';
import '../../assets/styles/logIn.css';
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa';
import validator from 'validator';
import { API_URL_LINK } from '../../utils/constants';
import { useDispatch } from 'react-redux';
import { userSlice } from '../../store/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import PrevButton from '../buttons/PrevButton';
import { useGlobalCart } from '../contexts/CartContext';

/**
 * LoginForm component for user login.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {number} props.width - The width of the viewport.
 * @returns {JSX.Element} JSX.Element representing the LoginForm component.
 */
const LoginForm = ({ width }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setUserLogged, setCartItems, uploadCartToDatabase } = useGlobalCart();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const validateEmail = () => {
    if (email.trim() === '') {
      setEmailError('Please enter an email');
    } else if (!validator.isEmail(email)) {
      setEmailError('Please enter a valid email');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = () => {
    if (password.trim() === '') {
      setPasswordError('Password is required');
    } else {
      setPasswordError('');
    }
  };

  const handleLogin = async () => {
    setIsLoading(true);
    setUserLogged(false);
    validateEmail();
    validatePassword();

    if (emailError === '' && passwordError === '') {
      try {
        const response = await fetch(`${API_URL_LINK}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          const data = await response.json();
          dispatch(userSlice.actions.loginUser(data));
          setIsLoading(true);
          await uploadCartToDatabase(data);
          setCartItems([])
          setTimeout(() => {
            setIsLoading(false);
          }, 800);
          navigate(-1);
        } else {
          setLoginError('Incorrect email or password');
        }
      } catch (error) {
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 800);
      }
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 800);
    }
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleClick = () => {
    setIsClicked(true);
    navigate(-1);
  };

  return (
    <Grid item xs={12} md={6}>
      <Card className='cardLog' style={{ maxWidth: 600, margin: 'auto' }}>
        <CardContent className='cardContentLog'>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
            <PrevButton onClick={handleClick} iconSize={width < 768 ? 32 : 20} />
            <Typography variant={width < 768 ? 'h5' : 'h4'} className='textTitleToStyle' style={{ fontWeight: 'bold' }}>
              Log In <span className='textToStyle'>to</span> The Liko
            </Typography>
          </div>
          <Typography variant={width < 768 ? 'body2' : 'body1'} className='subTitleStyle' marginBottom={12}>
            Enter your details below
          </Typography>
          <Grid container direction='column' spacing={3}>
            <Grid item sx={{ paddingTop: 6, paddingBottom: 6, position: 'relative' }}>
              <TextField
                label='Email' variant='outlined' fullWidth value={email} onChange={(e) => setEmail(e.target.value)}
                onBlur={validateEmail} error={emailError !== ''} helperText={emailError} required inputProps={{ maxLength: 256 }}
              />
            </Grid>
            <Grid item sx={{ paddingTop: 6, paddingBottom: 6, position: 'relative' }}>
              <TextField
                label='Password' variant='outlined' fullWidth type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)}
                onBlur={validatePassword} error={passwordError !== ''} helperText={passwordError} required inputProps={{ maxLength: 256 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton onClick={handlePasswordVisibility}>
                        {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item>
              {isLoading ? (
                <div className="loader-container center" style={{ position: 'center' }}>
                  <div className="loader" style={{ position: 'center' }}></div>
                </div>
              ) : (
                <Button variant='contained' className='buttonLog' fullWidth sx={{ height: 60, fontSize: 16, fontWeight: 'bold' }} onClick={handleLogin}>
                  Log In
                </Button>
              )}
            </Grid>
            {loginError && (
              <Typography variant="body2" color="error" sx={{ textAlign: 'center', marginTop: 2 }}>
                {loginError}
              </Typography>
            )}
          </Grid>
        </CardContent>
      </Card>
      <Grid item sx={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
        <Typography variant={width < 768 ? 'h6' : 'h5'} className='createAccountLink'>
          Don't have an account yet? <Link to="/sign_up" className='createText'> Sign Up </Link>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default LoginForm;