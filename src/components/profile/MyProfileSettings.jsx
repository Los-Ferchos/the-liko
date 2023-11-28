import React from 'react';
import { Typography, Button, Box } from '@mui/material';
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
  return (
    <Box
      className="user-info"
      sx={{
        width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px',
        padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <OrderTable />
    </Box>
  );
};


export const DefaultSection = () => {
  return null;
};
