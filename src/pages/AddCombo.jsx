import { Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Header from '../components/header/Header'
import ProductForm from '../components/products/form/ProductForm'
import NavigationText from '../components/navText/NavigationText'
import { useParams } from 'react-router-dom'
import { API_URL_LINK } from '../utils/constants'
import { FaExclamationTriangle } from 'react-icons/fa'
import ComboForm from '../components/combos/ComboForm'

/**
 * Page component for adding or editing a combo form.
 *
 * @component
 * @returns {JSX.Element} - The rendered ComboFormPage component.
 */
const ComboFormPage = ({ isEditing = false }) => {

    const { comboId = "" } = useParams();

    const [product, setProduct] = useState({
        name: '',
        description: '',
        stock: 1,
        price: 1,
      });
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
                    }
                );
            } catch (error) {
                setError(true);
            }
            setLoading(false);
        };

        if(isEditing) fetchProduct();
    }, [comboId, isEditing]);

    return (
        <Container>
            <Header/>
            <NavigationText
            inactivePath={[{ title: "Home", href: "/" }, { title: "Admin", href: "/admin" }]} 
            activePath={`${isEditing ? "Edit" : "Add"} Combo`} 
            />
            <Typography variant='h4' color='primary' component='h1' marginTop={6}>
                {`${isEditing ? "Edit" : "Add"} Combo`} 
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
                    <ComboForm productData={product} edit={isEditing} />
                )
            }
        </Container>
    )
}

export default ComboFormPage