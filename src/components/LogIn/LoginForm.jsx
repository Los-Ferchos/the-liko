import React, { useState, useEffect } from 'react';
import { Typography, Grid, TextField, Card, CardContent, Button, IconButton, InputAdornment } from '@mui/material';
import '../../assets/styles/logIn.css';
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa';
import validator from 'validator';
import { API_URL_LINK } from '../../utils/constants';
import { useDispatch } from 'react-redux';
import { userSlice } from '../../store/userSlice';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ width }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

          setTimeout(() => {
            setIsLoading(false);
          }, 2000);

          localStorage.setItem('userData', JSON.stringify(data));
          const savedData = localStorage.getItem('userData');

          setIsLoading(true);

          navigate('/');
        } else {
          console.log('Request failed');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Grid item xs={12} md={6}>
      <Card className='cardLog' style={{ maxWidth: 600, margin: 'auto' }}>
        <CardContent className='cardContentLog'>
          <Typography variant={width < 768 ? 'h5' : 'h4'} className='textTitleToStyle' style={{ fontWeight: 'bold' }} marginBottom={12}>
            Log In <span className='textToStyle'>to</span> The Likos
          </Typography>
          <Typography variant={width < 768 ? 'body2' : 'body1'} className='subTitleStyle' marginBottom={12}>
            Enter your details below
          </Typography>
          <Grid container direction='column' spacing={3}>
            <Grid item sx={{ paddingTop: 6, paddingBottom: 12, position: 'relative' }}>
              <TextField
                label='Email'
                variant='outlined'
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={validateEmail}
                error={emailError !== ''}
                helperText={emailError}
                required
                inputProps={{ maxLength: 256 }}
              />
            </Grid>
            <Grid item sx={{ paddingTop: 6, paddingBottom: 12, position: 'relative' }}>
              <TextField
                label='Password'
                variant='outlined'
                fullWidth
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={validatePassword}
                error={passwordError !== ''}
                helperText={passwordError}
                required
                inputProps={{ maxLength: 256 }}
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
                <div className="loader-container center" style={{position: 'center'}}>
                  <div className="loader" style={{position: 'center'}}></div>
                </div>
              ) : (
                <Button
                  variant='contained'
                  className='buttonLog'
                  fullWidth
                  sx={{ height: 60, fontSize: 16, fontWeight: 'bold' }}
                  onClick={handleLogin}
                >
                  Log In
                </Button>
              )}
            </Grid>
            <Grid item sx={{ display: 'flex', justifyContent: 'center' }} marginTop={12}>
              <Typography variant={width < 768 ? 'h7' : 'h6'} className='forgotPasswordLink'>
                <a href='#'>Forgot password?</a>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Grid item sx={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
        <Typography variant={width < 768 ? 'h7' : 'h6'} className='createAccountLink'>
          Don't have an account yet? <a href='#' className='createText'> Sign Up </a>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default LoginForm;