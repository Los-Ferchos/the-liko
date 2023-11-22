import { Container, Typography } from '@mui/material'
import React from 'react'
import Header from '../components/header/Header'
import ProductForm from '../components/products/form/ProductForm'
import NavigationText from '../components/navText/NavigationText'

/**
 * Page component for adding a new product form.
 *
 * @component
 * @returns {JSX.Element} - The rendered AddProductFormPage component.
 */
const AddProductFormPage = () => {
  return (
    <Container>
        <Header/>
        <NavigationText
          inactivePath={[{ title: "Home", href: "/" }, { title: "Admin", href: "/admin" }]} 
          activePath={"Add Product"} 
        />
        <Typography variant='h4' color='primary' component='h1' marginTop={6}>
            Add Product
        </Typography>
        <ProductForm/>
    </Container>
  )
}

export default AddProductFormPage