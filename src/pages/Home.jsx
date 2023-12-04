import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import { useAppSelector } from '../components/hooks/store';
import { API_URL_LINK } from '../utils/constants';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import ProductCarouselHome from '../components/products/carousel/ProductCarouselHome';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Banner2 from '../assets/images/Banner.png';

const Home = () => {
  const subcategoriesState = useAppSelector((state) => state.subcategories.subcategories);
  const [subcategories, setSubcategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]); 

  useEffect(() => {
    const manualFeaturedProducts = [
      {
        _id: '65445f5ae1b4d51d570c9e9c',
        banner: Banner2, 
        name: 'Featured Product 1',
      },
      {
        _id: '65445f21e1b4d51d570c9e96',
        banner: Banner2,
        name: 'Featured Product 2',
      },
      {
        _id: '65445f47e1b4d51d570c9e9a',
        banner: Banner2, 
        name: 'Featured Product 3',
      },
    ];
    setFeaturedProducts(manualFeaturedProducts);
  }, []);

  useEffect(() => {
    setSubcategories(subcategoriesState);
  }, [subcategoriesState]);

  return (
    <>
      <Container>
        <Header />
        <Carousel showThumbs={false} autoPlay>
          {featuredProducts.map((product) => (
            <div key={product._id}>
              <Link to={`/products/${product._id}`} className="flex">
                <img src={product.banner} alt={product.name} />
              </Link>
            </div>
          ))}
        </Carousel>
        <Typography variant='h4' color='primary' component='h1' marginTop={6}>
          All Categories
        </Typography>
        {subcategories.map(subcat => (
          <div key={subcat._id} style={{ marginBottom: 30 }}>
            <ProductCarouselHome apiUrl={`${API_URL_LINK}/products/subcategory/${subcat._id}`} categoryName={subcat.categoryName} subcat={subcat} subcategoriesState={subcategoriesState} />
          </div>
        ))}
      </Container>
      <Footer />
    </>
  );
};

export default Home;
