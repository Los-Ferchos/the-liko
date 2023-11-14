import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { capitalizeString, filterDataArray } from '../utils/methods';
import { useAppSelector } from '../components/hooks/store';
import NavigationText from '../components/navText/NavigationText';
import { API_URL_LINK } from '../utils/constants';
import ProductCarousel from '../components/products/carousel/ProductCarousel'

/**
 * ProductsBySubcategories component displays products based on subcategories.
 * @returns {JSX.Element} Rendered ProductsBySubcategories component.
 */
const ProductsBySubcategories = () => {
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
    <Container>
      <Header />
      <NavigationText 
            inactivePath={[{ title: "Home", href: "/" }, { title: capitalizeString(categoryName), href: `/${categoryName}` }]}
            activePath='All'
        />
      <Typography variant='h4' color='primary' component='h1' marginTop={6}>
            {capitalizeString(categoryName)}
      </Typography>
      {
        subcategories.map(subcat => (
          <React.Fragment key={subcat._id}>            
            <ProductCarousel
              apiUrl={`${API_URL_LINK}/products/subcategory/${subcat._id}?page=1&limit=16`}
              categoryName={categoryName}
              subcat={subcat}>
            </ProductCarousel>
          </React.Fragment>
        ))
      }
    </Container>
  );
};

export default ProductsBySubcategories;
