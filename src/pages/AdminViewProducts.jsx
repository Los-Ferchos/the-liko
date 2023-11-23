import React, { useEffect, useState } from 'react';
import { Container, Typography, CircularProgress } from '@mui/material';
import CommingSoon from '../components/ComingSoon';
import Header from '../components/header/Header';
import NavigationText from '../components/navText/NavigationText';
import { useNavigate, useParams } from 'react-router-dom';
import { capitalizeString, filterDataArray, getInactiveAdminPaths } from '../utils/methods';
import SubcategoriesList from '../components/categories/SubcategoriesList';
import ProductsDisplay from '../components/products/ProductsDisplay';
import { API_URL_LINK } from '../utils/constants';

const AdminViewProducts = ({destination = ""}) => {
  const { name = "Products", nameCat = "" } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const actualUrl = `${API_URL_LINK}/products`;


  return (
    <Container>
        <Header/>
        <>
          <NavigationText inactivePath={getInactiveAdminPaths(nameCat)} activePath={capitalizeString(name)} />
          <Typography variant='h4' color='primary' component='h1' marginTop={6}>
            {capitalizeString(name)}
          </Typography>
          <ProductsDisplay apiUrl={actualUrl} loading={false} type={"admin"} />
        </>
    </Container>
  )
}

export default AdminViewProducts
