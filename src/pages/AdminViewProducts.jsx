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

/**
 * AdminViewProducts component displays a list of products for the user to edit, delete or set the stock.
 * 
 * @param {Object} props - The properties of the component.
 * @returns {JSX.Element} - Rendered AdminViewProducts component.
 */
const AdminViewProducts = ({ }) => {
  const { name = "Products", nameCat = "" } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const actualUrl = `${API_URL_LINK}/all-products`;
  const { width } = useWindowSize();
  const navigate = useNavigate();

  /**
   * Hook to update the isLoading status.
   */
  useEffect(() => {
    if (name === "Products") {
      setIsLoading(false);
    } else getIdParam(dataGet[destination]);
  }, []);

  const handleClick = () => {
    navigate('/admin/add-product')
  };

  return (
    <Container>
      <Header />
      <>
        {isLoading ? (
          <div className='full-centered-container'>
            <CircularProgress />
          </div>
        ) : (
          <>
            <NavigationText inactivePath={getInactiveAdminPaths(nameCat)} activePath={capitalizeString(name)} />
            <Typography variant='h4' color='primary' component='h1' marginTop={6}>
              {capitalizeString(name)}
            </Typography>
            <ProductsDisplay apiUrl={actualUrl} loading={false} type={"admin"} />
            <Fab
              style={{ position: "fixed", bottom: 40, right: 40, zIndex: 1000 }}
              color="primary"
              size={width < 960 ? 'medium' : ''}
              onClick={handleClick}>
              <AddIcon />
            </Fab>
          </>
        )}

      </>
    </Container>
  )
}

export default AdminViewProducts
