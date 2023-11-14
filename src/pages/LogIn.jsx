import React, { useState } from 'react';
import { Container, Typography, Grid, TextField, Card, CardContent, Button, IconButton, InputAdornment } from '@mui/material';
import HeaderSimple from '../components/HeaderSimple';
import './../assets/styles/logIn.css';
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import validator from 'validator';
import { API_URL_LINK } from '../utils/constants';
import { loginUser } from '../store/userSlice'; // Reemplaza esto con la ubicación correcta de tu slice en Redux
import { useDispatch } from 'react-redux';
import { userSlice } from '../store/userSlice'; // Verifica la ruta correcta de tu slice
import Home from './Home';

const LogIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();

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
                    console.log("Estoy logueado juas");
                    const data = await response.json();
                    console.log(data);
                    dispatch(userSlice.actions.loginUser(data)); 

                    console.log('ioi');

                    // Guardar en localStorage
                    localStorage.setItem('userData', JSON.stringify(data));
                    const savedData = localStorage.getItem('userData');
                    console.log('Data saved in localStorage:', savedData); // Esto verifica si los datos se guardaron correctamente
                    console.log('689');
                    <Home> </Home>
                } else {
                    console.log('Error en la solicitud');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='divContainer'>
            <Container>
                <HeaderSimple />
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Card className='cardLog'>
                            <CardContent className='cardContentLog'>
                                <Typography variant="h4" className='textTitleToStyle' style={{ fontWeight: 'bold' }} marginBottom={12}>
                                    Log In <span className='textToStyle'>to</span> The Likos
                                </Typography>
                                <Typography variant="body1" className='subTitleStyle' marginBottom={12}>
                                    Enter your details below
                                </Typography>
                                <Grid container direction="column" spacing={3}>
                                    <Grid item sx={{ paddingTop: 6, paddingBottom: 12, position: 'relative' }}>
                                        <TextField
                                            label="Email"
                                            variant="outlined"
                                            fullWidth
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            onBlur={validateEmail}
                                            error={emailError !== ''}
                                            helperText={emailError}
                                            required // Campo requerido
                                        />
                                    </Grid>
                                    <Grid item sx={{ paddingTop: 6, paddingBottom: 12, position: 'relative' }}>
                                        <TextField
                                            label="Password"
                                            variant="outlined"
                                            fullWidth
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            onBlur={validatePassword}
                                            error={passwordError !== ''}
                                            helperText={passwordError}
                                            required // Campo requerido
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton onClick={handlePasswordVisibility}>
                                                            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            className='buttonLog'
                                            fullWidth
                                            sx={{ height: 60, fontSize: 20, fontWeight: 'bold' }}
                                            onClick={handleLogin}
                                        >
                                            Log In
                                        </Button>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default LogIn;
