import { Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';

const ProductCard = ({ product }) => {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card>
        <CardMedia
          component="img"
          alt={product.name}
          height="200"
          image={product.imgUrl}
          title={product.name}
        />
        <CardContent>
          <Typography variant="h6" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
          <Typography variant="subtitle1">
            Price: {product.price.value} {product.price.currency}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ProductCard;