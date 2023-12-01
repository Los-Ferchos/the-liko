import React, { useState } from 'react'
import { Grid, Card, CardContent, Typography, Modal, Box } from '@mui/material';
import '../../../assets/styles/products.css';
import RatingWishProduct from '../rating/RatingWishProduct';
import AddToCartButton from '../../buttons/AddToCartButton';
import LazyImage from '../../images/LazyImage';
import bottleLoaderImg from '../../../assets/images/bottle-loader.png';
import EditProductButton from '../../buttons/EditProductButton';
import DeleteProductButton from '../../buttons/DeleteProductButton';
import SetStockButton from '../../buttons/SetStockButton';
import HideProductButton from '../../buttons/HideProductButton';
import { Link } from 'react-router-dom';
import { getHyphenedString } from '../../../utils/methods';
import FieldText from '../../fields/FieldText';
import EditStockModal from './EditStockModal';

/**
 * Displays a product card with details such as image, rating, title, price, and add to cart button.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.product - The product object containing details like ID, image URL, name, rating, total reviews, and price.
 * @param {String} className - The className to assign a css design
 * 
 * @returns {JSX.Element} Rendered ProductCard component.
 */
const ProductCard = ({ product = {}, className = "", type = "client", collection = "products", editLinkRoute }) => {

  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Grid item xs={12} sm={6} md={3} className={className}>
      <Card style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Link state={{ product }} to={`/${collection}/${getHyphenedString(product._id)}`}>
          <LazyImage
            src={product.imgUrl}
            placeholderSrc={bottleLoaderImg}
            className={"product-image-container"}
          />
        </Link>
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
                  {product.price.currency}&nbsp;
                  {
                    Number.isInteger(product.price.value) ?
                      product.price.value :
                      parseFloat(product.price.value).toFixed(2)
                  }
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
                <EditProductButton product={product} editLinkRoute={editLinkRoute} />
                <div style={
                  { display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: 5, marginTop: 5 }
                }>
                  <HideProductButton product={product} collection={collection} />
                  <DeleteProductButton product={product} collection={collection} />
                </div>
                { collection === "products" && <SetStockButton onClick={handleOpen} /> }
                <EditStockModal handleClose={ handleClose } open={open} product={product}/>
              </div>
            </CardContent>)
        }
      </Card>
    </Grid>
  )
};

export default ProductCard;
