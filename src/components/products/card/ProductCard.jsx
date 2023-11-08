import { Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';
import '../../../assets/styles/products.css';
import RatingWishProduct from '../rating/RatingWishProduct';
import AddToCartButton from '../../buttons/AddToCartButton';

const ProductCard = ({ product = {} }) => {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <CardMedia
          component="img"
          alt={product.name}
          image={product.imgUrl}
          title={product.name}
          className='product-image-container'
          style={{ objectFit: 'contain', flex: '1 0 auto' }}
        />
        <CardContent className="product-card-content" style={{ background: '#fdfdfd' }}>
          <RatingWishProduct 
            rating={product.rating} 
            reviews={product.totalReviews} 
            productId={product._id}
          />
          <div className="product-title">
            <Typography variant="h6" component="div" style={{ fontWeight: "bold" }}>
              {product.name}
            </Typography>
          </div>
          <div className="product-price">
            <Typography variant="subtitle1">
              {product.price.currency} {product.price.value} 
            </Typography>
          </div>
          <AddToCartButton productId={product._id}/>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ProductCard;
