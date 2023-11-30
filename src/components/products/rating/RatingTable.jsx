import React, { useEffect } from 'react'
import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import "../../../../src/assets/styles/ratingTable.css"
import { API_URL_LINK } from '../../../utils/constants'
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { FaStar } from "react-icons/fa";
import { useGlobalCart } from '../../contexts/CartContext';


const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#DB4444' : '#DB4444',
    },
  }));

const calicationLine = (numberStar, rating, porcentaje) =>{
    return <>
        <div className='bar-calification'>
        <div className='start_number'>
            <FaStar className='star' size={20} color='#FFD700' />
            <Typography variant='h6'>{numberStar}</Typography>
        </div>
         <Box sx={{ flexGrow: 1 }}>
            <BorderLinearProgress variant="determinate" value={porcentaje} />
        </Box>
        <Typography variant='h6'>{rating}</Typography>

        </div>
    </>
}

const validateIfProducIsPurchased = async (productId, userId) => {
    const response = await fetch(`${API_URL_LINK}/productPurchased/${userId}/${productId}`);
    const data = await response.json();
    console.log(data)
    return data

}

function RatingTable(productId) {
    const { userLogged } = useGlobalCart();

    const [rating_1, setRating_1] = useState(0)
    const [rating_2, setRating_2] = useState(0)
    const [rating_3, setRating_3] = useState(0)
    const [rating_4, setRating_4] = useState(0)
    const [rating_5, setRating_5] = useState(0)
    let porcentajeRating_1 = (rating_1 * 100) / (rating_1 + rating_2 + rating_3 + rating_4 + rating_5)
    let porcentajeRating_2 = (rating_2 * 100) / (rating_1 + rating_2 + rating_3 + rating_4 + rating_5)
    let porcentajeRating_3 = (rating_3 * 100) / (rating_1 + rating_2 + rating_3 + rating_4 + rating_5)
    let porcentajeRating_4 = (rating_4 * 100) / (rating_1 + rating_2 + rating_3 + rating_4 + rating_5)
    let porcentajeRating_5 = (rating_5 * 100) / (rating_1 + rating_2 + rating_3 + rating_4 + rating_5)

    validateIfProducIsPurchased(productId.productId, 1)

    const getRatingInformation = async () => {
        const response = await fetch(`${API_URL_LINK}/informationRatingProducts/${productId.productId}`);
        const data = await response.json();
        console.log(data)
        setRating_1(data.rating_1)
        setRating_2(data.rating_2)
        setRating_3(data.rating_3)
        setRating_4(data.rating_4)
        setRating_5(data.rating_5)
    }
    
    useEffect(() => {
        getRatingInformation();
    }, [])
    

  return (
    <div className='table-container'>
        <Typography variant='h6'style={{ fontWeight: 'bold' }}>Rating </Typography>
       {calicationLine(1,rating_1,porcentajeRating_1)}
       {calicationLine(2,rating_2,porcentajeRating_2)}
       {calicationLine(3,rating_3,porcentajeRating_3)}
       {calicationLine(4,rating_4,porcentajeRating_4)}
       {calicationLine(5,rating_5,porcentajeRating_5)}     
          
    </div>
  )
}

export default RatingTable