import React, { useEffect, useState } from 'react';
import { CircularProgress, Container, Typography } from '@mui/material';
import ProductsDisplay from '../components/products/ProductsDisplay';
import NavigationText from '../components/navText/NavigationText';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../components/hooks/store';
import SubcategoriesList from '../components/categories/SubcategoriesList';
import { capitalizeString, filterDataArray, getInactivePaths } from '../utils/methods';
import { API_URL_LINK } from '../utils/constants';
import FilterComponent from '../components/filters/FilterComponent';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

/**
 * Products component displays a list of products based on the specified category or subcategory.
 *
 * @param {Object} props - The properties of the component.
 * @param {string} [props.destination=""] - The destination path for fetching products (e.g., "/category" or "/subcategory").
 * @returns {JSX.Element} - Rendered Products component.
 */
const Products = ({ destination = "" }) => {
  const navigate = useNavigate();
  const { name = "Products", nameCat = "" } = useParams();
  const [idParam, setIdParam] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const categories = useAppSelector((state) => state.categories.categories);
  const subcategories = useAppSelector((state) => state.subcategories.subcategories);

  /**
   * Object containing category or subcategory data based on the specified destination.
   * @type {Object}
   */
  const dataGet = { "/category": categories, "/subcategory": subcategories };

  /**
   * Retrieves the ID parameter for the specified category or subcategory name.
   * @function
   * @param {Object[]} arrayToFilter - The array to filter (categories or subcategories).
   */
  const getIdParam = (arrayToFilter) => {
    const idCat = filterDataArray(arrayToFilter, "name", name);
    setIdParam(idCat.length > 0 ? idCat[0]._id : "");
    setIsLoading(idCat.length === 0);
  };

  /**
   * useEffect hook to update ID parameter and loading state when the name or dataGet[destination] changes.
   */
  useEffect(() => {
    setIsLoading(true);
    if (name === "Products") {
      setIdParam("");
      setIsLoading(false);
    } else getIdParam(dataGet[destination]);
  }, [name, categories, subcategories, dataGet, destination]);

  /**
   * useEffect hook to navigate to 404 page if the specified category or subcategory is not found.
   */
  useEffect(() => {
    if (
      categories.length > 0 &&
      subcategories.length > 0 &&
      name !== "Products" &&
      filterDataArray(dataGet[destination], "name", name).length === 0
    )
      navigate("/404");
  }, [idParam, categories, subcategories, name]);

  const actualUrl = `${API_URL_LINK}/products${destination}/${idParam}`;

  return (
    <>
    <Container component={"section"} className='vertical-container-padding'>
      <Header />
      {isLoading ? (
        <div className='full-centered-container'>
          <CircularProgress />
        </div>
      ) : (
        <>
          <NavigationText inactivePath={getInactivePaths(nameCat)} activePath={capitalizeString(name)} />
          <FilterComponent/>
          <Typography variant='h4' color='primary' component='h1' marginTop={6}>
            {capitalizeString(name)}
          </Typography>
          <SubcategoriesList categoryName={name} />
          <ProductsDisplay apiUrl={actualUrl} loading={isLoading} />
        </>
      )}
    </Container>
      <Footer />
    </>
  );
};

export default Products;
