import React, { useEffect } from 'react'
import { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import "../../../../src/assets/styles/ratingTable.css"
import { API_URL_LINK } from '../../../utils/constants'
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { FaStar } from "react-icons/fa";
import { useGlobalCart } from '../../contexts/CartContext';
import { FaRegStar } from "react-icons/fa";
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

/**
 * Renders a line of rating information.
 * 
 * @param {number} numberStar - The number of stars.
 * @param {number} rating - The rating value.
 * @param {number} porcentaje - The percentage value.
 * @returns {JSX.Element} The rendered rating line.
 */
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

/**
 * Validates if a product is purchased by a user.
 * @param {string} userId - The ID of the user.
 * @param {string} productId - The ID of the product.
 * @returns {Promise} - A promise that resolves to the data indicating if the product is purchased.
 */
const validateIfProducIsPurchased = async (userId, productId) => {
  const response = await fetch(`${API_URL_LINK}/productPurchased/${userId}/${productId}`);
  const data = await response.json();
  return data;
}


function RatingTable(productId) {
    const { userLogged } = useGlobalCart();
    const [ratingIsModified, setRatingIsModified] = useState(false)

    const [currentUserRating, setCurrentUserRating] = useState(0)
    let ratingUpdated = 0
    const [productPurchased, setProductPurchased] = useState(false)
    const [buttonDisabled, setButtonDisabled] = useState(false)

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

    if(rating_1 === 0 && rating_2 === 0 && rating_3 === 0 && rating_4 === 0 && rating_5 === 0){
      porcentajeRating_1 = 0
      porcentajeRating_2 = 0
      porcentajeRating_3 = 0
      porcentajeRating_4 = 0
      porcentajeRating_5 = 0
    }

    const [star_1_marked, setStar_1_marked] = useState(false)
    const [star_2_marked, setStar_2_marked] = useState(false)
    const [star_3_marked, setStar_3_marked] = useState(false)
    const [star_4_marked, setStar_4_marked] = useState(false)
    const [star_5_marked, setStar_5_marked] = useState(false)
    if(userLogged !== null){
      validateIfProducIsPurchased(userLogged.userId, productId.productId)
    }
    const getRatingInformation = async () => {
        const response = await fetch(`${API_URL_LINK}/informationRatingProducts/${productId.productId}`);
        const data = await response.json();
        setRating_1(data.rating_1)
        setRating_2(data.rating_2)
        setRating_3(data.rating_3)
        setRating_4(data.rating_4)
        setRating_5(data.rating_5)
    }

    const getRatingUserProduct = async () => {
        const response = await fetch(`${API_URL_LINK}/ratingUser/${userLogged.userId}/${productId.productId}`);
        if(response.ok){ 
          const data = await response.json();
          setCurrentUserRating(data.ratingUser)
          setMarkedStar(data.ratingUser )
          setRatingIsModified(false)
        }else{
          setCurrentUserRating(0)
        }
    }
    
    useEffect(() => {
        getRatingInformation();
       
        setButtonDisabled(false)      
        if(userLogged !== null){
          verifyIfUserIsPurchased(); 
          getRatingUserProduct(); 
          
        }
    }, [rating_1, rating_2, rating_3, rating_4, rating_5])

    const setMarkedStar = (numberStar) => {
      switch (numberStar) {
        case 1:
          verifyIfRatingIsModified(1)
          setStar_1_marked(true)
          setStar_2_marked(false)
          setStar_3_marked(false)
          setStar_4_marked(false)
          setStar_5_marked(false)
          
          break;
        case 2:

        verifyIfRatingIsModified(2)
          setStar_1_marked(true)
          setStar_2_marked(true)
          setStar_3_marked(false)
          setStar_4_marked(false)
          setStar_5_marked(false)
          break;
        case 3:
          verifyIfRatingIsModified(3)
          setStar_1_marked(true)
          setStar_2_marked(true)
          setStar_3_marked(true)
          setStar_4_marked(false)
          setStar_5_marked(false)
         
          break;
        case 4:
          verifyIfRatingIsModified(4)
          setStar_1_marked(true)
          setStar_2_marked(true)
          setStar_3_marked(true)
          setStar_4_marked(true)
          setStar_5_marked(false)
          
          break;
        case 5:
          verifyIfRatingIsModified(5)
          setStar_1_marked(true)
          setStar_2_marked(true)
          setStar_3_marked(true)
          setStar_4_marked(true)
          setStar_5_marked(true)
          
          break;
        default:
          break;
      }
    }

    const verifyIfRatingIsModified = (ratingUpdated) => {
      if(ratingUpdated !== currentUserRating){
        setRatingIsModified(true)
      }else{
        setRatingIsModified(false)
      }
    }

    const saveRating = async () => {
      setButtonDisabled(true)
      ratingUpdated = getCurrentUserRating()
      const response = await fetch(`${API_URL_LINK}/ratingUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: userLogged.userId,
          productId: productId.productId,
          rating: ratingUpdated
        })
      });
      
      const data = await response.json();
      setCurrentUserRating(ratingUpdated)
      setRatingIsModified(false)

      await fetch (`${API_URL_LINK}/modifyRatingProduct`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({
          tokenUser: userLogged.userId,
          productId: productId.productId,
          rating: currentUserRating,
          decrease: true
        })

      })

      await fetch (`${API_URL_LINK}/modifyRatingProduct`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tokenUser: userLogged.userId,
          productId: productId.productId,
          rating: ratingUpdated,
          decrease: false
        })
      })

      getRatingInformation();
    }

    const getCurrentUserRating = () => {
      let currentStarsMarked = 0
      if(star_1_marked){
        currentStarsMarked = 1
      }if(star_2_marked){
        currentStarsMarked = 2
      }
      if(star_3_marked){
        currentStarsMarked = 3
      }
      if(star_4_marked){
        currentStarsMarked = 4
      }
      if(star_5_marked){
        currentStarsMarked = 5
      }

      return currentStarsMarked;
    }

    const verifyIfUserIsPurchased = async () => {
      const response = await fetch(`${API_URL_LINK}/productPurchased/${userLogged.userId}/${productId.productId}`);
      const data = await response.json();
      setProductPurchased(data.purchased)
    }

  return (
    <div className='table-container'>
    
        <Typography variant='h6'style={{ fontWeight: 'bold' }}>Rating </Typography>
        {calicationLine(5,rating_5,porcentajeRating_5)}   
        {calicationLine(4,rating_4,porcentajeRating_4)}
        {calicationLine(3,rating_3,porcentajeRating_3)}
        {calicationLine(2,rating_2,porcentajeRating_2)}
        {calicationLine(1,rating_1,porcentajeRating_1)}
     
       {productPurchased? (<div className='rate-options'>
        <Typography variant='h6'style={{ fontWeight: 'bold' }}>Rate this product </Typography>
        <div className='User-rating'>
          {star_1_marked ? <FaStar className='star' size={50} color='#FFD700' onClick={() => setMarkedStar(1)} /> : <FaRegStar className='star' size={50} color='#FFD700' onClick={() => setMarkedStar(1)} />}
          {star_2_marked ? <FaStar className='star' size={50} color='#FFD700' onClick={() => setMarkedStar(2)} /> : <FaRegStar className='star' size={50} color='#FFD700' onClick={() => setMarkedStar(2)} />}
          {star_3_marked ? <FaStar className='star' size={50} color='#FFD700' onClick={() => setMarkedStar(3)} /> : <FaRegStar className='star' size={50} color='#FFD700' onClick={() => setMarkedStar(3)} />}
          {star_4_marked ? <FaStar className='star' size={50} color='#FFD700' onClick={() => setMarkedStar(4)} /> : <FaRegStar className='star' size={50} color='#FFD700' onClick={() => setMarkedStar(4)} />}
          {star_5_marked ? <FaStar className='star' size={50} color='#FFD700' onClick={() => setMarkedStar(5)} /> : <FaRegStar className='star' size={50} color='#FFD700' onClick={() => setMarkedStar(5)} />}
        </div>
        <div className='edit-rating'>
            {ratingIsModified ?
              <Button  disabled={buttonDisabled}  color='primary' className="edit-button" variant="contained" onClick={() => saveRating()} style={{ backgroundColor: '#DB4444', color: 'white', justifyContent: 'space-between' }}>
              <Typography variant='h6'>Save rating</Typography>
              </Button>: ""}
          </div>
        </div>):""}  
    </div>
  )
}

export default RatingTable