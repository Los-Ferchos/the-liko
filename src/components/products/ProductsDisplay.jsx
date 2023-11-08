import React from 'react';
import ProductList from './list/ProductList';
import { Typography } from '@mui/material';
import '../../assets/styles/products.css'
import ProductsGridLoader from './list/ProductListLoader';

const Products = ({ products, title = "Products", isLoading }) => {
  return (
    <div style={{ padding: '20px' }}>
      <Typography color="primary" variant="h4" gutterBottom>
        {title}
      </Typography>
      {isLoading ? <ProductsGridLoader/> : <ProductList products={products} /> }
    </div>
  );
};

export default Products;
