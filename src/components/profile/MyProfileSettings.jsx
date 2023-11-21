import React from 'react';
import { Typography, Button, Divider } from '@mui/material';
import { FaArrowRightFromBracket } from 'react-icons/fa6';
import OrderTable from '../products/table/ControlledAccordionGroup';
import { useNavigate } from 'react-router-dom';
import { useGlobalCart } from '../contexts/CartContext';
import useWindowSize from '../../components/hooks/useWindowSize';


export const ConstructionSection = () => {
  return (
    <div >
      <Typography variant="h6">In construction!</Typography>
    </div>
  );
};

export const OrderHistorySection = () => {
  const { setUserLogged } = useGlobalCart();
  const navigate = useNavigate();

  return (
    <div className="order-table">
      <OrderTable />
      <Button
        variant="contained"
        color="primary"
        startIcon={<FaArrowRightFromBracket />}
        onClick={() => { setUserLogged(null); navigate(-1) }}
      > Log Out
      </Button>
    </div>
  );
};

export const ProfileSection = () => {
  const { setUserLogged } = useGlobalCart();
  const navigate = useNavigate();
  const { width } = useWindowSize();


  return (

    <div className="user-info">
      <div className='sub-title'>
        <Typography variant={width < 768 ? "h5" : "h4"} style={{ color: 'red', fontWeight: 'bold' }}>
          User Information
        </Typography>
      </div>
      <div className="user-field">
        <Typography variant="body1" >Name</Typography>
        <div className="user-value" >
          <Typography variant="user-value" >JuanExample</Typography>
        </div>
      </div>
      <div className="user-field">
        <Typography variant="body1" >Email</Typography>
        <div className="user-value" >
          <Typography variant="user-value" >juan@example.com</Typography>
        </div>
      </div>

      <div className="user-field">
        <Typography variant="body1" >Address</Typography>
        <div className="user-value" >
          <Typography variant="user-value" >Address</Typography>
        </div>
      </div>
      <Button variant="contained" color="primary" startIcon={<FaArrowRightFromBracket />} onClick={() => { setUserLogged(null); navigate(-1) }} >Log Out </Button>

    </div>
  );
};


export const DefaultSection = () => {
  return null;
};
