import { Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Header from '../components/header/Header'
import ProductForm from '../components/products/form/ProductForm'
import NavigationText from '../components/navText/NavigationText'
import { useParams } from 'react-router-dom'
import { API_URL_LINK } from '../utils/constants'

/**
 * Page component for editing an existing product form.
 *
 * @component
 * @returns {JSX.Element} - The rendered EditProductFormPage component.
 */
const EditProductFormPage = () => {

    const { productId } = useParams();

    const [product, setProduct] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${API_URL_LINK}/products/${productId}`);

                if (!response.ok) {
                    setError(true);
                }

                const productData = await response.json();
                console.log({ ...productData, price: productData.price.value })
                setProduct({ ...productData, price: productData.price.value });
            } catch (error) {
                setError(true);
            }
        };

        fetchProduct();
    }, [productId]);

    return (
        <Container>
            <Header/>
            <NavigationText
            inactivePath={[{ title: "Home", href: "/" }, { title: "Admin", href: "/admin" }]} 
            activePath={"Edit Product"} 
            />
            <Typography variant='h4' color='primary' component='h1' marginTop={6}>
                Edit Product
            </Typography>
            <ProductForm />
        </Container>
    )
}

export default EditProductFormPage