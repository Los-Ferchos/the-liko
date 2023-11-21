import { Container } from '@mui/material'
import React from 'react'
import Header from '../components/header/Header'
import ProductForm from '../components/products/form/ProductForm'
import CategoriesSubcategories from '../components/products/form/CategoriesSubcategories'

const AddProductFormPage = () => {
  return (
    <Container>
        <Header/>
        <ProductForm/>
    </Container>
  )
}

export default AddProductFormPage