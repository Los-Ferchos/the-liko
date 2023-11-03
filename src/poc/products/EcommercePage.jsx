import React from 'react';
import ProductList from './ProductList';
import { Typography } from '@mui/material';

const EcommercePage = ({ products }) => {
  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>
      <ProductList products={products} />
    </div>
  );
};

export default EcommercePage;
