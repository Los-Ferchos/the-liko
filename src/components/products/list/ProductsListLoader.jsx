import React from 'react';
import { Grid } from '@mui/material';
import ProductCardLoader from '../card/ProductCardLoader';

const ProductsListLoader = () => {
  const numberOfProducts = 16;
  const productLoaders = [];

  for (let i = 0; i < numberOfProducts; i++) {
    productLoaders.push(<ProductCardLoader key={i} />);
  }

  return (
    <Grid container spacing={16} className='products-grid-container'>
      {productLoaders}
    </Grid>
  );
};

export default ProductsListLoader;
