import React, {useEffect} from 'react';
import { Container, Grid} from '@mui/material';
import HeaderSimple from '../components/header/HeaderSimple';
import './../assets/styles/logIn.css';
import useWindowSize from '../components/hooks/useWindowSize';
import LoginForm from '../components/LogIn/LoginForm';
import { useGlobalCart } from '../components/contexts/CartContext';
import { useNavigate } from 'react-router-dom';

/**
 * LogIn component renders the login page.
 *
 * @component
 * @example
 * // Example usage of LogIn component
 * <LogIn />
 *
 * @returns {JSX.Element} JSX.Element
 */
const LogIn = () => {
  const { width } = useWindowSize();
  const { userLogged } = useGlobalCart();
  const navigate = useNavigate();  

  useEffect(() => {
    if (userLogged) {
      navigate('/profile');
    }
  }, [userLogged, navigate]);

  /**
   * Renders the LogIn component.
   *
   * @returns {JSX.Element} JSX.Element
   */
  return (
    <div className='divContainer'>
      <HeaderSimple />
      <Container>
      <br />
      <br />
        <Grid container spacing={4} justifyContent='center' alignItems='center'>
          <LoginForm width={width} />
        </Grid>
      </Container>
    </div>
  );
};

export default LogIn;
