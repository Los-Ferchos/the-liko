import { Grid, Typography } from '@mui/material';
import ProductCard from '../card/ProductCard';
import { FaExclamationTriangle, FaRegFrown } from 'react-icons/fa';

/**
 * Displays a list of product cards in a grid layout.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {boolean} props.failed - A boolean indicating if the request has failed
 * @param {Array} props.products - An array of product objects to be displayed.
 * 
 * @returns {JSX.Element} Rendered ProductsList component.
 */
const ProductsList = ({ products = [], failed = false }) => (
  <>
    {
      failed  ? (
        <div className='full-centered-container'>
          <FaExclamationTriangle color='red' size={64}/>
          <Typography marginTop={12} variant='h4'>There was an error, please try again.</Typography>
        </div>
      ) : products.length === 0 ? (
        <div className='full-centered-container'>
          <FaRegFrown size={64}/>
          <Typography marginTop={12} variant='h4'>No Products were found</Typography>
        </div>
      ) : (
        <Grid container spacing={16} className='products-grid-container'>
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </Grid>
      )
    }
  </>
);

export default ProductsList;
