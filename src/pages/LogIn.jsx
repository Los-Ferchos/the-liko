import React from 'react';
import { Container, Grid} from '@mui/material';
import HeaderSimple from '../components/HeaderSimple';
import './../assets/styles/logIn.css';
import useWindowSize from '../components/hooks/useWindowSize';
import NavigationText from '../components/navText/NavigationText';
import LoginForm from '../components/LogIn/LoginForm';


const LogIn = () => {
  const { width } = useWindowSize();


  return (
    <div className='divContainer'>
      <HeaderSimple />
      
      <Container>
      <NavigationText inactivePath={[{ title: "Home", href: "/" }]} activePath='Log In' />
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
