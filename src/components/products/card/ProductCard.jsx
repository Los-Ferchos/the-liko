import { Grid, Card, CardContent, Typography } from '@mui/material';
import '../../../assets/styles/products.css';
import RatingWishProduct from '../rating/RatingWishProduct';
import AddToCartButton from '../../buttons/AddToCartButton';
import LazyImage from '../../images/LazyImage';
import bottleLoaderImg from '../../../assets/images/bottle-loader.png';
import EditProductButton from '../../buttons/EditProductButton';
import DeleteProductButton from '../../buttons/DeleteProductButton';
import SetStockButton from '../../buttons/SetStockButton';
import HideProductButton from '../../buttons/HideProductButton';

/**
 * Displays a product card with details such as image, rating, title, price, and add to cart button.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.product - The product object containing details like ID, image URL, name, rating, total reviews, and price.
 * @param {String} className - The className to assign a css design
 * 
 * @returns {JSX.Element} Rendered ProductCard component.
 */
const ProductCard = ({ product = {}, className = "", type = "client" }) => (
  <Grid item xs={12} sm={6} md={3} className={className}>
    <Card style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <LazyImage
        src={product.imgUrl}
        placeholderSrc={bottleLoaderImg}
        className={"product-image-container"}
      />
      {
        type === "client" ?
          (<CardContent className="product-card-content" style={{ background: '#fdfdfd' }}>
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
            <AddToCartButton product={product} />
          </CardContent>)
          :
          (<CardContent className="product-card-content" style={{ background: '#fdfdfd' }}>
            <div className="product-title">
              <Typography variant="h6" component="div" style={{ fontWeight: "bold" }}>
                {product.name}
              </Typography>
            </div>
            <div>
              <EditProductButton product={product} />
              <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", marginBottom:5, marginTop:5}}>
                <HideProductButton product={product}/>
                <DeleteProductButton product={product}/>
              </div>
              <SetStockButton />
            </div>
          </CardContent>)
      }
    </Card>
  </Grid>
);

export default ProductCard;
