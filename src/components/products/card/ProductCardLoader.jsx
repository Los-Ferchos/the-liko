import { Grid, Card, CardContent } from '@mui/material';
import '../../../assets/styles/products.css';
import bottleLoaderImg from '../../../assets/images/bottle-loader.png';
import contentLoaderImg from '../../../assets/images/content-loader.png';
import LazyImage from '../../images/LazyImage';

/**
 * Displays a loading placeholder for a product card.
 *
 * @returns {JSX.Element} Rendered ProductCardLoader component.
 */
const ProductCardLoader = ({className=""}) => {
  return (
      <Grid item xs={12} sm={6} md={3} className={className}>
        <Card style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div className="skeleton-loader">
            <div className="skeleton-overlay"></div>
              <LazyImage
                src={bottleLoaderImg}
                placeholderSrc={bottleLoaderImg}
                className={"product-image-container"}
              />
            <CardContent className="product-card-content" style={{ background: '#fdfdfd' }}>
              <div className="skeleton-loader">
                <div className="skeleton-overlay"></div>
                <img className='image-with-overlay' src={contentLoaderImg} alt="content loader" />
              </div>
            </CardContent>
          </div>
        </Card>
      </Grid>
  );
};

export default ProductCardLoader;
