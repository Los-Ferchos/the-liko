import { Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Header from '../components/header/Header'
import NavigationText from '../components/navText/NavigationText'
import { useParams } from 'react-router-dom'
import { API_URL_LINK } from '../utils/constants'
import { FaExclamationTriangle } from 'react-icons/fa'
import DrinkMixForm from '../components/drinkMixes/DrinkMixForm'

/**
 * Page component for adding or editing a combo form.
 *
 * @component
 * @returns {JSX.Element} - The rendered DrinkMixFormPage component.
 */
const DrinkMixFormPage = ({ isEditing = false }) => {

    const { drinkMixId = "" } = useParams();

    const [drinkMix, setDrinkMix] = useState({
        name: '',
        description: '',
        ingredients: [''],
        relatedProducts: [],
        preparationSteps: ['']
      });
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(isEditing);

    useEffect(() => {
        const fetchDrinkMix = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${API_URL_LINK}/drink-mixes/${drinkMixId}`);

                if (!response.ok) {
                    setError(true);
                }

                const drinkMixData = await response.json();
                setDrinkMix(
                    { 
                        ...drinkMixData, 
                        price: drinkMixData.price.value, 
                        stock: drinkMixData.quantity,
                        relatedProducts: drinkMixData.relatedProducts.map(item => item._id)
                    }
                );
            } catch (error) {
                setError(true);
            }
            setLoading(false);
        };

        if(isEditing) fetchDrinkMix();
    }, []);

    return (
        <Container>
            <Header/>
            <NavigationText
            inactivePath={[{ title: "Home", href: "/" }, { title: "Admin", href: "/admin" }]} 
            activePath={`${isEditing ? "Edit" : "Add"} Drink Mix`} 
            />
            <Typography variant='h4' color='primary' component='h1' marginTop={6}>
                {`${isEditing ? "Edit" : "Add"} Drink Mix`} 
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
                    <DrinkMixForm drinkMixData={drinkMix} edit={isEditing} />
                )
            }
        </Container>
    )
}

export default DrinkMixFormPage