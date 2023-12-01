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
import ProductsList from '../components/products/list/ProductsList'

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
    const [relatedProducts, setRelatedProducts] = useState([]);

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
                setRelatedProducts(data.relatedProducts)
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
                    loading ? <div className="full-centered-container"><span className="loader"></span></div> : (
                        <div>
                            <NavigationText
                                inactivePath={[{ title: "Home", href: "/" }]}
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
                                    <Typography variant='h4' fontWeight="bold" style={{marginTop:"15px"}}>{product.name}</Typography>
                                    <RatingProduct
                                        rating={product.rating}
                                        reviews={product.totalReviews}
                                    />
                                    <hr />
                                    <Typography variant='h6' fontWeight="bold" style={{marginTop:"15px"}}>Product Description</Typography>
                                    <Typography textAlign={'left'}>{product.description}</Typography>
                                </div>
                            </div>
                            <div className='detail-list' >
                                <Typography variant='h6' color={'primary'} fontWeight="bold">Ingredients</Typography>
                                <hr />
                                <ol style={{ listStyleType: "disc", paddingLeft: 24 }}>
                                    {
                                        product.ingredients.map((ingredient, index) => (
                                            <li key={ingredient + index}>
                                                <Typography textAlign={"left"}>{ingredient}</Typography>
                                            </li>
                                        ))
                                    }
                                </ol>
                            </div>

                            <div className='detail-list' >
                                <Typography variant='h6' color={'primary'} fontWeight="bold">Preparation Steps</Typography>
                                <hr />
                                <ol style={{ listStyleType: "decimal", paddingLeft: 24 }}>
                                    {
                                        product.preparationSteps.map((steps, index) => (
                                            <li key={steps + index}>
                                                <Typography textAlign={"left"}>{steps}</Typography>
                                            </li>
                                        ))
                                    }
                                </ol>
                            </div>

                            {relatedProducts.length > 0 && (
                                <div>
                                    <Typography variant='h6' color={'primary'} fontWeight="bold">Products</Typography>
                                    <ProductsList collection="products" products={relatedProducts}></ProductsList>
                                </div>
                            )}
                        </div>
                    )
                }
            </Container>
            <Footer />
        </>

    )
}

export default DrinkMixDetail