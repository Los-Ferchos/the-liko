import React from 'react';
import ProductList from './ProductList';
import { Typography } from '@mui/material';
import '../../assets/styles/products.css'
import ProductsGridLoader from './ProductListLoader';

const EcommercePage = ({ products, title = "Products", isLoading }) => {
  return (
    <div style={{ padding: '20px' }}>
      <Typography color="primary" variant="h4" gutterBottom>
        {title}
      </Typography>
      {isLoading ? <ProductsGridLoader/> : <ProductList products={products} /> }
    </div>
  );
};

export default EcommercePage;
