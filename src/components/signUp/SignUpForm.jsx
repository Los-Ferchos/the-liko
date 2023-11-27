import { Button, Card, Typography, InputAdornment, IconButton} from '@mui/material'
import '../../assets/styles/signUpForm.css'
import validator from 'validator';
import { TextField } from '@mui/material';
import { useState } from 'react';
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import PrevButton from '../buttons/PrevButton';
import { API_URL_LINK } from '../../utils/constants';
import VerificacionModal from './VerificationModal';
import BottleLoader from '../loaderAnimations/bottleLoader';

/**
 * VerificacionModal Component
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {boolean} props.open - Specifies whether the modal is open or closed.
 * @param {function} props.onClose - Callback function to handle the closing of the modal.
 * @param {string} props.token - Unique token associated with the user for verification.
 * 
 * @returns {JSX.Element} - Returns the JSX element representing the VerificacionModal.
 */
function SignUpForm() {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [verifyPasswordError, setVerifyPasswordError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordVerified, setShowPasswordVerified] = useState(false);
    const [responseApi, setResponseApi] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [token, setToken] = useState(''); 
    const navigate = useNavigate();
    const passwordPattern =  /^(?=.*[a-zñ])(?=.*[A-ZÑ])(?=.*\d)(?=.*[+,\.\-_'"!¿?])[A-Za-zñÑ\d+,\.\-_'"!¿?]{6,80}$/;
    const validateEmail = () => {
        if (email.trim() === '') {
          setEmailError('Please enter an email');
        } else if (!validator.isEmail(email)) {
          setEmailError('Please enter a valid email');
        } else {
          setEmailError('');
        }
      }

    const verifyPassword = () => {
        if (!passwordPattern.test(password)) {
          setPasswordError('The password must have at least one lowercase, one uppercase, one number and one special character. Length: 6-80 characters.');
        } else if (password.trim() === ''){
            setPasswordError('Password is required');
        }else {
          setPasswordError('');
        }
      };
      

    const confirmSimilarPassword = () => {
        if (confirmPassword !== password) {
            setVerifyPasswordError('Passwords do not match');
        } else {
            setVerifyPasswordError('');
        }
    }

    const verifyUsername = () => {
        if (username.trim() === '') {
            setUsernameError('Username is required');
        } else {
            setUsernameError('');
        }
    }

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };
    
    const handlePasswordVisibilityVerified = () => {
        setShowPasswordVerified(!showPasswordVerified);
    }

    const handleClick = () => {
        navigate(-1);
      };

    const processSignUp = async () => {
        if(emailError === '' && passwordError === '' && verifyPasswordError === '' && usernameError === '') {
            try {
                setResponseApi('');
                setIsLoading(true);
                const response = await fetch(`${API_URL_LINK}/signup`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, email, password, confirmPassword }),
                });
                
                const data = await response.json();
                setResponseApi(data);
                setIsLoading(false);
                
                if(response.status === 201){
                    setToken(data.token);
                    setModalOpen(true);
                }
                
            } catch (error) {
                console.error('Error:', error);
            }
        }else{
            setResponseApi({message: 'Please enter valid data'});
        }
    }
                    
  return (
    <Card className='form-container'>
        <div className='tittle-container'>
            <div> <PrevButton onClick={handleClick} /> </div>
            <div><Typography variant='h4'  align='center' sx={{color: 'primary.main', fontWeight: 'bold'}}>
                Create <span> an Account</span>
            </Typography> </div>
            <div></div>
        </div>
        <Typography className='description-text' variant='body1'>
            Enter your details below
        </Typography>
        <TextField 
            label='Username' variant='outlined' fullWidth onChange={(e) => setUsername(e.target.value)} required
            error={usernameError !== ''} onBlur={verifyUsername} helperText={usernameError}/>
        <TextField
            label='Email' variant='outlined' fullWidth value={email} onChange={(e) => setEmail(e.target.value)}
            onBlur={validateEmail} error={emailError !== ''} helperText={emailError} required inputProps={{ maxLength: 256 }}
        />
        <TextField 
            label='Password' variant='outlined' type={showPassword ? 'text' : 'password'} onBlur={(e) => {verifyPassword(e); confirmSimilarPassword(e);}} error={passwordError !== ''} helperText={passwordError} 
            fullWidth value={password} onChange={(e) => setPassword(e.target.value)} required  inputProps={{maxLength: 256, minLength: 8}}
            InputProps={{
                endAdornment: (
                    <InputAdornment position='end'>
                    <IconButton onClick={handlePasswordVisibility}>
                        {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                    </IconButton>
                    </InputAdornment>
                ),}}
        />  
        <TextField 
            label='Confirm Password'variant='outlined'  type={showPasswordVerified ? 'text' : 'password'} onChange={(e) => setConfirmPassword(e.target.value )} error={verifyPasswordError !==''} fullWidth
            onBlur={confirmSimilarPassword} helperText={verifyPasswordError} required inputProps={{maxLength: 256, minLength: 8}}
            InputProps={{
                endAdornment: (
                    <InputAdornment position='end'>
                    <IconButton onClick={handlePasswordVisibilityVerified}>
                        {showPasswordVerified ? <FaRegEyeSlash /> : <FaRegEye />}
                    </IconButton>
                    </InputAdornment>
                ),}} />
        {isLoading ? 
         <BottleLoader/>
        : (<Button onClick={processSignUp} variant='contained' className='button-sign-up' fullWidth>
            <Typography variant='h5' sx={{fontWeight: 'bold'}}>
                Create Account
            </Typography>
         </Button>)}
         <Typography variant='body1' className='description-text' align='center' sx={{color: 'primary.main'}}>
            {responseApi.message == ""?"":responseApi.message}
        </Typography>
        <Typography variant='body1' className='description-text' align='center' sx={{color: 'primary.main'}}>
            <span>Already have an account?</span> <Link to='/logIn'>Log In</Link>
        </Typography>
        <VerificacionModal open={modalOpen} onClose={() => setModalOpen(false)} token={token} />
    </Card>
  )
}

export default SignUpForm