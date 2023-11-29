import React, { useEffect, useState } from 'react'
import { Container } from '@mui/material'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import { useLocation, useParams } from 'react-router-dom'
import NavigationText from '../components/navText/NavigationText'
import LazyImage from '../components/images/LazyImage'
import bottleLoaderImg from '../assets/images/bottle-loader.png'
import { Typography } from '@mui/material'
import RatingProduct from '../components/products/rating/RatingProduct'
import '../assets/styles/productDetails.css'
import { API_URL_LINK } from '../utils/constants'

/**
 * This is the page of the Dink Mix details.
 * Render all the information of a drink mix.
 * 
 * @returns {JSX.Element} Rendered DrinkMixDetail page.
 */
const DrinkMixDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(true)

    /**
     * UseEffect to fetch to get the drink mix with the corresponding id.
     */
    useEffect(() => {
        const fetchDrinkMix = async () => {
            setLoading(true)
            try {
                const response = await fetch(`${API_URL_LINK}/drink-mixes/${id}`);
                const data = await response.json()
                setProduct(data)
            } catch (e) {
                console.error('Error:', error);
            }
            setLoading(false)
        }
        fetchDrinkMix();
    }, []);

    return (
        <>
            <Container component={"section"} style={{ position: "relative" }}>
                <Header />
                {
                    loading ? <div className="full-centered-content"><span className="loader"></span></div> : (
                        <div>
                            <NavigationText
                                inactivePath={[{ title: "Home", href: "/" }, { title: "Products", href: `/products` }]}
                                activePath={product.name}
                            />
                            <div className={'information'} >
                                <div className='image'>
                                    <LazyImage
                                        src={product.imgUrl}
                                        placeholderSrc={bottleLoaderImg}
                                        className={"product-image-container"}
                                        style={{ width: 350, height: 350 }}
                                    />
                                </div>
                                <div className='product-info'>
                                    <Typography variant='h4' fontWeight="bold">{product.name}</Typography>
                                    <RatingProduct
                                        rating={product.rating}
                                        reviews={product.totalReviews}
                                    />
                                    <Typography variant='h6'>{`${product.price.currency} ${parseFloat(product.price.value).toFixed(2)}`}</Typography>
                                    <hr />
                                    <Typography variant='h6' fontWeight="bold">Product Descirption</Typography>
                                    <Typography textAlign={'left'}>{product.description}</Typography>
                                </div>
                            </div>
                            <div className='detail-list' >
                                <Typography variant='h6' color={'primary'} fontWeight="bold">Details</Typography>
                                <hr />
                            </div>
                            <hr />
                        </div>
                    )
                }
            </Container>
            <Footer />
        </>

    )
}

export default DrinkMixDetail