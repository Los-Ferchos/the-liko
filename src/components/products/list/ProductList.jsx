import { Grid } from '@mui/material';
import ProductCard from '../card/ProductCard';

const ProductList = ({ products }) => {
  return (
    <Grid container spacing={16} className='products-grid-container'>
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </Grid>
  );
};

export default ProductList;