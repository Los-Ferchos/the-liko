import React from 'react';
import { Container, Typography } from '@mui/material';
import ProductsDisplay from '../components/products/ProductsDisplay';
import NavigationText from '../components/navText/NavigationText';

/**
 * Products component displays a list of products.
 *
 * @returns {JSX.Element} Rendered Products component.
 */
const Products = () => {
  return (
    <Container component={"section"} className='vertical-container-padding'>
      <NavigationText inactivePath={[{ title: "Home", href: "/" }]} activePath='Products' />
      <Typography 
        variant='h4' 
        color='primary' 
        component='h1' 
        marginTop={6}>
          Products
      </Typography>
      <ProductsDisplay apiUrl="http://localhost:8080/products" />
    </Container>
  );
};

export default Products;
