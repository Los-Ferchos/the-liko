import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import ProductsDisplay from '../components/products/ProductsDisplay';
import NavigationText from '../components/navText/NavigationText';
import Header from '../components/Header';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../components/hooks/store';

/**
 * Products component displays a list of products.
 *
 * @returns {JSX.Element} Rendered Products component.
 */
const Products = ({ destination = "" }) => {
  const { name = "Products" } = useParams();
  const [idParam, setIdParam] = useState("");
  const [reload, setReload] = useState(true);

  const categoriesSubcategories = useAppSelector((state) => state.categories);

  useEffect(() => {
    if(name === "Products"){
      setIdParam("");
      setReload(false)
    }
    else if (destination.includes("category")){
      const idCat = 
        categoriesSubcategories.categories.filter(cat => cat.name.toLowerCase().replace(" ", "-") === name)
      setIdParam(idCat.length > 0 ? idCat[0]._id : "");
      setReload(idCat.length <= 0)
    }
  }, [name, categoriesSubcategories, destination])

  const capitalizeString = (str) => `${str.charAt(0).toUpperCase()}${str.slice(1).toLowerCase().replace("-", " ")}`;
  
  return (
    <Container component={"section"} className='vertical-container-padding'>
      <Header/>
      <NavigationText inactivePath={[{ title: "Home", href: "/" }]} activePath={capitalizeString(name)} />
      <Typography 
        variant='h4' 
        color='primary' 
        component='h1' 
        marginTop={6}>
          {capitalizeString(name)}
      </Typography>
      <ProductsDisplay apiUrl={`https://apitheliko.azurewebsites.net/products${destination}/${idParam}`} reload={reload} />
    </Container>
  );
};

export default Products;
