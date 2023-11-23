import { Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Header from '../components/header/Header'
import ProductForm from '../components/products/form/ProductForm'
import NavigationText from '../components/navText/NavigationText'
import { useParams } from 'react-router-dom'
import { API_URL_LINK } from '../utils/constants'
import { FaExclamationTriangle } from 'react-icons/fa'

/**
 * Page component for editing an existing product form.
 *
 * @component
 * @returns {JSX.Element} - The rendered EditProductFormPage component.
 */
const EditProductFormPage = () => {

    const { productId } = useParams();

    const [product, setProduct] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${API_URL_LINK}/products/${productId}`);

                if (!response.ok) {
                    setError(true);
                }

                const productData = await response.json();
                setProduct(
                    { 
                        ...productData, 
                        price: productData.price.value, 
                        stock: productData.quantity,
                        brand: productData.details.brand != null ? productData.details.brand : "",
                        abv: productData.details.abv != null ? productData.details.abv : "",
                        type: productData.details.type != null ? productData.details.type : ""
                    }
                );
            } catch (error) {
                setError(true);
            }
            setLoading(false);
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
            {
                loading ? (
                    <div className='full-centered-container'>
                        <span className="fast-loader"></span>
                    </div>
                ) : error ? (
                    <div className='full-centered-container'>
                        <FaExclamationTriangle color='red' size={64}/>
                        <Typography marginTop={12} variant='h4'>There was an error, please try again.</Typography>
                    </div>
                ) : (
                    <ProductForm productData={product} />
                )
            }
        </Container>
    )
}

export default EditProductFormPage