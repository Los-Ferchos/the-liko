import React, {useEffect} from 'react'
import { Container } from '@mui/material'
import HeaderSimple from '../components/header/HeaderSimple'
import SignUpForm from '../components/signUp/SignUpForm'
import '../assets/styles/signUpForm.css'
import { useGlobalCart } from '../components/contexts/CartContext';
import { useNavigate } from 'react-router-dom';

/**
 * A React component that displays a sign-up form for new users to create an account.
 *
 * @return {React.Component} A React component representing the sign-up page.
 */
function SignUp() {
  const { userLogged } = useGlobalCart();
  const navigate = useNavigate();  

  useEffect(() => {
    if (userLogged) {
      navigate('/profile');
    }
  }, [userLogged, navigate]);

  return (
    <Container>
      
        <HeaderSimple className='header-signup'/>
        <div className='main-container'>
            <SignUpForm/>
        </div>
    </Container>
  
  )
}

export default SignUp