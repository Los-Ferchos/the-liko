import React, { useEffect, useState } from 'react';
import { Container, Typography, CircularProgress, Fab } from '@mui/material';
import Header from '../components/header/Header';
import NavigationText from '../components/navText/NavigationText';
import { useNavigate, useParams } from 'react-router-dom';
import { capitalizeString, getInactiveAdminPaths } from '../utils/methods';
import ProductsDisplay from '../components/products/ProductsDisplay';
import { API_URL_LINK } from '../utils/constants';
import AddIcon from '@mui/icons-material/Add';
import useWindowSize from '../components/hooks/useWindowSize';

const AdminViewProducts = ({ }) => {
  const { name = "Products", nameCat = "" } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const actualUrl = `${API_URL_LINK}/products`;
  const { width } = useWindowSize();

  return (
    <Container>
      <Header />
      <>
        <NavigationText inactivePath={getInactiveAdminPaths(nameCat)} activePath={capitalizeString(name)} />
        <Typography variant='h4' color='primary' component='h1' marginTop={6}>
          {capitalizeString(name)}
        </Typography>
        <ProductsDisplay apiUrl={actualUrl} loading={false} type={"admin"} />
        <Fab
          style={{ position: "fixed", bottom: 40, right: 40, zIndex: 1000 }}
          color="primary"
          size={width<960?'medium':''}>
          <AddIcon />
        </Fab>
      </>
    </Container>
  )
}

export default AdminViewProducts
