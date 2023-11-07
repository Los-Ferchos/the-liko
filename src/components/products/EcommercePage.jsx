import React from 'react';
import ProductList from './ProductList';
import { Typography } from '@mui/material';
import '../../assets/styles/products.css'

const EcommercePage = ({ products, title = "Products" }) => {
  return (
    <div style={{ padding: '20px' }}>
      <Typography color="primary" variant="h4" gutterBottom>
        {title}
      </Typography>
      <ProductList products={products} />
    </div>
  );
};

export default EcommercePage;
