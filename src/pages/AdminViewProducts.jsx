import React, { useState } from 'react';
import { Container, Typography, CircularProgress, Fab } from '@mui/material';
import Header from '../components/header/Header';
import NavigationText from '../components/navText/NavigationText';
import { useNavigate, useParams } from 'react-router-dom';
import { capitalizeString } from '../utils/methods';
import ProductsDisplay from '../components/products/ProductsDisplay';
import { API_URL_LINK } from '../utils/constants';
import AddIcon from '@mui/icons-material/Add';
import useWindowSize from '../components/hooks/useWindowSize';

/**
 * AdminViewProducts component displays a list of products for the user to edit, delete or set the stock.
 * 
 * @param {Object} props - The properties of the component.
 * @returns {JSX.Element} - Rendered AdminViewProducts component.
 */
const AdminViewProducts = ({
    actionLinkRoutes = {
      add: "/admin/add-product",
      edit: "/admin/edit-product/"
    },
    fetchLinkRoute = "/all-products",
    typeProduct = "product",
    collection = "products"
}) => {
  const actualUrl = `${API_URL_LINK}${fetchLinkRoute}`;
  const { width } = useWindowSize();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(actionLinkRoutes.add)
  };

  return (
    <Container>
      <Header />
      <NavigationText 
        inactivePath={[{ title: "Home", href: "/" }, { title: "Admin", href: "/admin" }]} 
        activePath={capitalizeString(collection)} 
      />
      <Typography variant='h4' color='primary' component='h1' marginTop={6}>
        {capitalizeString(collection)}
      </Typography>
      <ProductsDisplay 
        apiUrl={actualUrl} 
        loading={false} 
        type={"admin"} 
        typeProduct={typeProduct} 
        collection={collection} 
        editLinkRoute={actionLinkRoutes.edit}
      />
      <Fab
        style={{ position: "fixed", bottom: 40, right: 40, zIndex: 1000 }}
        color="primary"
        size={width < 960 ? 'medium' : ''}
        onClick={handleClick}>
        <AddIcon />
      </Fab>
    </Container>
  )
}

export default AdminViewProducts
