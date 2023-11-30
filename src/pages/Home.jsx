import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { capitalizeString, filterDataArray } from '../utils/methods';
import { useAppSelector } from '../components/hooks/store';
import NavigationText from '../components/navText/NavigationText';
import { API_URL_LINK } from '../utils/constants';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import ProductCarousel from '../components/products/carousel/ProductCarousel';
import ProductCarouselItem from '../components/products/carousel/ProductCarouselItem';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../assets/styles/homepage.css';
import { Link } from 'react-router-dom';


/**
 * Home component displays products for all categories and subcategories.
 * @returns {JSX.Element} Rendered Home component.
 */
const Home = () => {

  /**
   * Redux state selector for subcategories.
   * @type {Array}
   */
  const subcategoriesState = useAppSelector((state) => state.subcategories.subcategories);

  /**
   * React Hook to manage the subcategories state.
   * @type {Array}
   */
  const [subcategories, setSubcategories] = useState([]);

  /**
   * React Hook to perform side effects on component mount or when dependencies change.
   * Fetches all subcategories for all categories.
   */
  useEffect(() => {
    setSubcategories(subcategoriesState);
  }, [subcategoriesState]);


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>

      <Container>
        <Header />
        <div style={{ overflow: 'hidden', marginTop: '15px', alignItems: 'center', justifyContent: 'center' }} className='imagen-container'>
        <Slider {...settings} >
          <div>
            <Link to="#">
              <img src={"https://i.ibb.co/stx3vY5/1.png"} alt="Product" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Link>
          </div>
          <div>
            <Link to="#">
              <img src={"https://i.ibb.co/s1crsFZ/3.png"} alt="Product" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Link>
          </div>
          <div>
            <Link to="#">
              <img src={"https://i.ibb.co/f9mgY05/2.png"} alt="Product" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Link>
          </div>
        </Slider>
      </div>

        <Typography variant='h4' color='primary' component='h1' marginTop={6}>
          All Categories
        </Typography>
        {
          subcategories.map(subcat => (
            <div key={subcat._id} style={{ marginBottom: 30 }}>
              <ProductCarousel
                apiUrl={`${API_URL_LINK}/products/subcategory/${subcat._id}`}
                categoryName={subcat.categoryName}
                subcat={subcat}
              />
            </div>
          ))
        }
      </Container>
      <Footer />
    </>
  );
};

export default Home;
