import React, { useEffect, useState } from 'react';
import { CircularProgress, Container, LinearProgress, Typography } from '@mui/material';
import ProductsDisplay from '../components/products/ProductsDisplay';
import NavigationText from '../components/navText/NavigationText';
import Header from '../components/Header';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../components/hooks/store';

/**
 * Products component displays a list of products.
 *
 * @returns {JSX.Element} Rendered Products component.
 */
const Products = ({ destination = "" }) => {
  const navigate = useNavigate();
  const { name = "Products", nameCat = "" } = useParams();
  const [idParam, setIdParam] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const categories = useAppSelector((state) => state.categories.categories);
  const subcategories = useAppSelector((state) => state.subcategories.subcategories);

  const dataGet = { "/category": categories, "/subcategory": subcategories}

  const filterDataArray = (arrayToFilter, compareData, valueData) => 
    arrayToFilter.filter(cat => cat[compareData].toLowerCase().replace(" ", "-") === valueData);

  const capitalizeString = (str) => `${str.charAt(0).toUpperCase()}${str.slice(1).toLowerCase().replace("-", " ")}`;

  const getInactivePaths = () => {
    const inactivePaths = [{ title: "Home", href: "/" }]
    if(nameCat != "")
      inactivePaths.push({ title: capitalizeString(nameCat), href: `/${nameCat}`})
    return inactivePaths;
  }

  const getIdParam = (arrayToFilter) => {
    const idCat = filterDataArray(arrayToFilter, "name", name);
    setIdParam(idCat.length > 0 ? idCat[0]._id : "");
    setIsLoading(idCat.length === 0);
  }

  useEffect(() => {
    setIsLoading(true);
    if(name === "Products"){
      setIdParam("");
      setIsLoading(false)
    }
    else getIdParam(dataGet[destination])
  }, [name, categories, subcategories, dataGet, destination])

  useEffect(() => {
      if(
          categories.length > 0 && 
          subcategories.length > 0 && 
          name !== "Products" && 
          filterDataArray(dataGet[destination], "name", name).length === 0
        ) 
        navigate("/404");
  }, [idParam, categories, subcategories, name])
  
  return (
    <Container component={"section"} className='vertical-container-padding'>
      <Header/>
      {
        isLoading ? <div className='full-centered-container'><CircularProgress/></div> : (
          <>
          <NavigationText inactivePath={getInactivePaths()} activePath={capitalizeString(name)} />
            <Typography 
              variant='h4' 
              color='primary' 
              component='h1' 
              marginTop={6}>
                {capitalizeString(name)}
            </Typography>
            <ProductsDisplay 
              apiUrl={`https://apitheliko.azurewebsites.net/products${destination}/${idParam}`} 
              loading={isLoading} 
            />
          </>
        )
      }
    </Container>
  );
};

export default Products;
