import { Container, Typography } from '@mui/material'
import React from 'react'
import ProductsDisplay from '../components/products/ProductsDisplay'
import NavigationText from '../components/navText/NavigationText'

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
  )
}

export default Products