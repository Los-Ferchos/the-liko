import React from 'react';
import { Container, Grid} from '@mui/material';
import HeaderSimple from '../components/HeaderSimple';
import './../assets/styles/logIn.css';
import useWindowSize from '../components/hooks/useWindowSize';
import NavigationText from '../components/navText/NavigationText';
import LoginForm from '../components/LogIn/LoginForm';

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
