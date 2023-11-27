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
import '../assets/styles/productDetails.css'
import { useAppSelector } from '../components/hooks/store'

function ProductDetails() {
  const location = useLocation();
  const product = location.state.product;
  const categories = useAppSelector((state) => state.categories.categories);
  const subcategories = useAppSelector((state) => state.subcategories.subcategories);

  const getCategory = () => {
    const foundCategory = categories.find(category => category._id === product.category);
    return foundCategory ? foundCategory.name : '';
  };

  const getSubcategory = () => {
    const foundSubcategory = subcategories.find(subcategory => subcategory._id === product.subcategory);
    return foundSubcategory ? foundSubcategory.name : '';
  };


  return (
    <>
      <Container component={"section"} style={{ position: "relative" }}>
        <Header />
        <NavigationText
          inactivePath={[{ title: "Home", href: "/" }, { title: "Products", href: `/products` }]}
          activePath={product.name}
        />
        <div>
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
              <Typography variant='h6'>{`${product.price.value} ${product.price.currency}`}</Typography>
              <hr />
              <Typography variant='h6' fontWeight="bold">Product Descirption</Typography>
              <Typography textAlign={'left'}>{product.description}</Typography>
            </div>
          </div>
          <div className='detail-list' >
            <Typography variant='h6' color={'primary'} fontWeight="bold">Product Details</Typography>
            <hr />
            <div style={{ display: 'flex', width: '100%' }}>
              <div className='detail'>
                <Typography fontWeight="bold">Category</Typography>
              </div>
              <div className='detail'>
                <Typography >{getCategory()}</Typography>
              </div>
            </div>
            <hr style={{ display: product.details.abv ? 'flex' : 'none' }} />
            <div style={{ display: product.details.abv ? 'flex' : 'none', width: '100%' }}>
              <div className='detail'>
                <Typography fontWeight="bold">Subcategory</Typography>
              </div>
              <div className='detail'>
                <Typography >{getSubcategory()}</Typography>
              </div>
            </div>
            <hr />
            <div style={{ display: 'flex', width: '100%' }}>
              <div className='detail'>
                <Typography fontWeight="bold">Brand</Typography>
              </div>
              <div className='detail'>
                <Typography >{product.details.brand}</Typography>
              </div>
            </div>
            <hr style={{ display: product.details.abv ? 'flex' : 'none' }} />
            <div style={{ display: product.details.abv ? 'flex' : 'none', width: '100%' }}>
              <div className='detail'>
                <Typography fontWeight="bold">ABV</Typography>
              </div>
              <div className='detail'>
                <Typography >{product.details.abv}</Typography>
              </div>
            </div>
            <hr />
          </div>
        </div>


      </Container>
      <Footer />
    </>

  )
}

export default ProductDetails