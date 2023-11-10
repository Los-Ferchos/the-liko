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
  const { name = "Products", nameCat = "" } = useParams();
  const [idParam, setIdParam] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [inactivePath, setInactivePath] = useState([{ title: "Home", href: "/" }])

  const categories = useAppSelector((state) => state.categories.categories);
  const subcategories = useAppSelector((state) => state.subcategories.subcategories);

  const dataGet = { "/category": categories, "/subcategory": subcategories}

  const filterDataArray = (arrayToFilter, compareData, valueData) => 
    arrayToFilter.filter(cat => cat[compareData].toLowerCase().replace(" ", "-") === valueData)


  const getIdParam = (arrayToFilter) => {
    const idCat = filterDataArray(arrayToFilter, "name", name);
    if (destination.includes('/subcategory') && idCat.length > 0){
      const catsArray = filterDataArray(dataGet['/category'], "_id", idCat[0].category);
      setInactivePath(
        [{ title: "Home", href: "/" }, { title: catsArray[0].name, href: `/${catsArray[0].name.toLowerCase().replace(" ", "-")}` }]
      )
    }
    setIdParam(idCat.length > 0 ? idCat[0]._id : "");
    setIsLoading(idCat.length == 0);
  }

  useEffect(() => {
    if(name === "Products"){
      setIdParam("");
      setIsLoading(false)
    }
    else getIdParam(dataGet[destination])
  }, [name, categories, subcategories, dataGet, destination])

  const capitalizeString = (str) => `${str.charAt(0).toUpperCase()}${str.slice(1).toLowerCase().replace("-", " ")}`;
  
  return (
    <Container component={"section"} className='vertical-container-padding'>
      <Header/>
      <NavigationText inactivePath={inactivePath} activePath={capitalizeString(name)} />
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
    </Container>
  );
};

export default Products;
