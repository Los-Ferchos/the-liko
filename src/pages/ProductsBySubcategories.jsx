import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { capitalizeString, filterDataArray } from '../utils/methods';
import { useAppSelector } from '../components/hooks/store';

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
      <Typography>
        Subcategorized Products - Still in development
      </Typography>
      <Typography>
        Category: {capitalizeString(categoryName)}
      </Typography>
      <Typography>
        Subcategories:
      </Typography>
      {
        subcategories.map(subcat => (
          <React.Fragment key={subcat._id}>
            <Typography>Id: {subcat._id}</Typography>
            <Typography>Name: {subcat.name}</Typography>
          </React.Fragment>
        ))
      }
    </Container>
  );
};

export default ProductsBySubcategories;
