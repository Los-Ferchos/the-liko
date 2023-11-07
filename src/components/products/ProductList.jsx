import { Grid } from '@mui/material';
import ProductCard from './ProductCard';

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