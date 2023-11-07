import { Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';
import RatingStars from './rating/RatingStars';
import RatingProduct from './rating/RatingProduct';
import '../../assets/styles/products.css'

const ProductCard = ({ product = {} }) => {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card>
        <CardMedia
          component="img"
          alt={product.name}
          image={product.imgUrl}
          title={product.name}
          className='product-image-container'
          style={{ objectFit: 'contain' }}
        />
        <CardContent>
          <RatingProduct rating={product.rating} reviews={product.totalReviews} />
          <div className="product-title">
            <Typography variant="h6" component="div">
              {product.name}
            </Typography>
          </div>
          <Typography variant="subtitle1">
            {product.price.currency} {product.price.value} 
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ProductCard;