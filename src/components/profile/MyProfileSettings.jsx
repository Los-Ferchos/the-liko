import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import CustomizedAccordions from '../products/accordion/OrdersAccordion';
import useWindowSize from '../hooks/useWindowSize';

/**
 * ConstructionSection component displays a message indicating that the section is under construction.
 *
 * @component
 * @returns {JSX.Element} - The rendered component.
 */
export const ConstructionSection = () => {
  return (
    <div >
      <Typography variant="h6">In construction!</Typography>
    </div>
  );
};

/**
 * OrderHistorySection component displays the order history section with a responsive layout.
 *
 * @component
 * @returns {JSX.Element} - The rendered component.
 */
export const OrderHistorySection = () => {
  const { width, height } = useWindowSize();
  return (
    <Box
      className="user-info"
      sx={{
        width: '100%', 
        display: 'flex',
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: '16px',
        padding: width > 600 ? '20px' : '20px 4px', 
        border: '1px solid #ddd', 
        borderRadius: '8px', 
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <CustomizedAccordions />
    </Box>
  );
};


export const DefaultSection = () => {
  return null;
};
