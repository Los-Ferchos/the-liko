import React, { useEffect } from 'react'
import { Container } from '@mui/material'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import { useLocation, useParams } from 'react-router-dom'
import NavigationText from '../components/navText/NavigationText'
import { capitalizeString } from '../utils/methods'
import LazyImage from '../components/images/LazyImage'
import bottleLoaderImg from '../assets/images/bottle-loader.png'
import { Typography } from '@mui/material'
import RatingProduct from '../components/products/rating/RatingProduct'

function ProductDetails() {
  const location = useLocation();
  const product = location.state.product;

  console.log(product)
  return (
    <>
      <Container component={"section"}>
        <Header />
        <NavigationText
          inactivePath={[{ title: "Home", href: "/" }, { title: "Products", href: `/products` }]}
          activePath={product.name}
        />
        <div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>
            <div>
              <LazyImage
                src={product.imgUrl}
                placeholderSrc={bottleLoaderImg}
                className={"product-image-container"}
                style={{ width: 350, height: 350 }}
              />
            </div>
            <div style={{ width: '50%' }}>
              <Typography variant='h4' fontWeight="bold">{product.name}</Typography>
              <RatingProduct
                rating={product.rating}
                reviews={product.totalReviews}
              />
              <Typography variant='h6'>{`${product.price.value} ${product.price.currency}`}</Typography>
              <hr />
              <Typography variant='h6' fontWeight="bold">Product Descirption</Typography>
              <Typography >{product.description}</Typography>
            </div>
          </div>
          <div>
            <Typography variant='h6' color={'primary'} fontWeight="bold">Product Details</Typography>
            <div>
              <Typography fontWeight="bold">Category</Typography>
              <Typography >{product.category}</Typography>
            </div>
            <div>
              <Typography fontWeight="bold">Subcategory</Typography>
              <Typography >{product.subcategory}</Typography>
            </div>
          </div>
        </div>


      </Container>
      <Footer />
    </>

  )
}

export default ProductDetails