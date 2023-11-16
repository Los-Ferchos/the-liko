import React from 'react';
import { Container, Grid, Button } from '@mui/material';
import { FaArrowRightFromBracket } from 'react-icons/fa6';
import Header from '../components/header/Header';
import useWindowSize from '../components/hooks/useWindowSize';
import { Avatar, Typography, Divider } from '@mui/material';
import NavigationText from '../components/navText/NavigationText';
import { useGlobalCart } from '../components/contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { width } = useWindowSize();
  const { setUserLogged } = useGlobalCart();
  const navigate = useNavigate();

  return (
    <Container>
      <Header />

      <NavigationText inactivePath={[{ title: "Home", href: "/" }]} activePath='Profile' />

      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
        </Grid>
        <Grid item xs={12} md={9} container justifyContent="center" alignItems="center">
          <div className='buttonLogOut'>
            <Button
              variant="contained"
              color="primary"
              startIcon={<FaArrowRightFromBracket />}
              onClick={() => {
                setUserLogged(null);
                navigate(-1);

              }}
            >
              Log Out
            </Button>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
