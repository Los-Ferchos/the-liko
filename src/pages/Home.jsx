import { useEffect, useState, useRef } from 'react';
import { Container } from '@mui/material';
import NewHeader from '../components/header/Header';
import Footer from '../components/footer/Footer';
import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { capitalizeString, filterDataArray } from '../utils/methods';
import { useAppSelector } from '../components/hooks/store';
import { API_URL_LINK } from '../utils/constants';
import Footer from '../components/footer/Footer';
import ProductCarousel from '../components/products/carousel/ProductCarousel';


const Home = ({ apiUrl = "", categoryName = "", subcat, type = "client" }) => {
   /**
   * React Hook to extract the categoryName parameter from the URL.
   * @type {Object}
   * @property {string} categoryName - The name of the category.
   */
   const { categoryName } = useParams();

   /**
    * Redux state selector for categories.
    * @type {Array}
    */
   const categoriesState = useAppSelector((state) => state.categories.categories);
 
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
    * Filters subcategories based on the provided category name.
    */
   useEffect(() => {
     const idCategory = filterDataArray(categoriesState, "name", categoryName);
 
     if (idCategory.length > 0) {
       setSubcategories(subcategoriesState.filter(subcat => subcat.category === idCategory[0]._id));
     }
   }, [categoriesState, subcategoriesState, categoryName]);

  return (
    <>
      <Container>
        <NewHeader />
        {
          subcategories.map(subcat => (
            <div key={subcat._id} style={{ marginBottom: 30 }}>
              <ProductCarousel
                apiUrl={`${API_URL_LINK}/products/subcategory/${subcat._id}`}
                categoryName={categoryName}
                subcat={subcat}
              />
            </div>
          ))
        }
      </Container>
      <Footer />
    </>
  );
}

export default Home;
