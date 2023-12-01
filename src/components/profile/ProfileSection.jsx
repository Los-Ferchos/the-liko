import React from 'react';
import { useState } from 'react';
import { Typography, Button, Box } from '@mui/material';
import { FaArrowRightFromBracket } from 'react-icons/fa6';
import { useGlobalCart } from '../contexts/CartContext';
import useWindowSize from '../../components/hooks/useWindowSize';
import { useNavigate } from 'react-router-dom';
import { API_URL_LINK } from '../../utils/constants';
import { useGlobalWish } from '../contexts/WishContext';

/**
 * A React component that displays user information and a "Log Out" button.
 *
 * @return {React.Component} A React component representing the profile section.
 */
const ProfileSection = () => {
  const { setUserLogged, userLogged} = useGlobalCart();
  const { width } = useWindowSize();
  const navigate = useNavigate();
  const {clearAllWishList} = useGlobalWish();
  const [username, setUsername] =useState('');
  const [email, setEmail] = useState('');

  const getUserInformation = async() => {
    const response = await fetch(`${API_URL_LINK}/users/${userLogged.userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      const data = await response.json();
      setUsername(data.user.username);
      setEmail(data.user.email);
    } 
  }

  getUserInformation();

  return (
    <Box
      className="user-info"
      sx={{
        width: '90%',
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
          <Typography variant="user-value" style={{margin: '10px' }}> {username}</Typography>
        </div>
      </div>

      <div className="user-field">
        <Typography variant="body1">Email</Typography>
        <div className="user-value">
          <Typography variant="paragraph" style={{margin: '10px' }}>{email}</Typography>
        </div>
      </div>

      <Button
        variant="contained"
        color="primary"
        startIcon={<FaArrowRightFromBracket style={{ color: 'white' }} />}
        onClick={() => {
            clearAllWishList();
            setUserLogged(null);
            navigate('/');

          }}
      >
        Log Out
      </Button>
    </Box>
  );
};

export default ProfileSection;
