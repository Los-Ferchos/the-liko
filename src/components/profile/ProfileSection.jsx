import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { FaArrowRightFromBracket } from 'react-icons/fa6';
import { useGlobalCart } from '../contexts/CartContext';
import useWindowSize from '../../components/hooks/useWindowSize';

const ProfileSection = () => {
  const { setUserLogged } = useGlobalCart();
  const { width } = useWindowSize();

  return (
    <Box
      className="user-info"
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
        padding: '30px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant={width < 768 ? 'h6' : 'h5'} style={{ color: 'red', fontWeight: 'bold' }}>
        User Information
      </Typography>

      <div className="user-field">
        <Typography variant="body1" >Name</Typography>
        <div className="user-value">
          <Typography variant="user-value" style={{margin: '10px'}}>JuanExample</Typography>
        </div>
      </div>

      <div className="user-field">
        <Typography variant="body1">Email</Typography>
        <div className="user-value">
          <Typography variant="user-value" style={{margin: '10px'}}>juan@example.com</Typography>
        </div>
      </div>

      <div className="user-field">
        <Typography variant="body1">Address</Typography>
        <div className="user-value" >
          <Typography variant="user-value" style={{margin: '10px'}}>Address</Typography>
        </div>
      </div>

      <Button
        variant="contained"
        color="primary"
        startIcon={<FaArrowRightFromBracket style={{ color: 'white' }} />}
        onClick={() => setUserLogged(null)}
      >
        Log Out
      </Button>
    </Box>
  );
};

export default ProfileSection;
