import { Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';
import '../../assets/styles/products.css'
import RatingWishProduct from './RatingWishProduct';

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
        <CardContent style={{ background: '#fdfdfd' }}>
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
          <Typography variant="subtitle1">
            {product.price.currency}  {product.price.value} 
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ProductCard;