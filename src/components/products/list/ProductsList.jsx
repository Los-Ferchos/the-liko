import { Grid } from '@mui/material';
import ProductCard from '../card/ProductCard';

/**
 * Displays a list of product cards in a grid layout.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Array} props.products - An array of product objects to be displayed.
 * 
 * @returns {JSX.Element} Rendered ProductsList component.
 */
const ProductsList = ({ products }) => (
  <Grid container spacing={16} className='products-grid-container'>
    {products.map((product) => (
      <ProductCard key={product._id} product={product} />
    ))}
  </Grid>
);

export default ProductsList;
