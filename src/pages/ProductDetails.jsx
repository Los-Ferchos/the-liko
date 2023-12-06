import React, { useEffect, useState } from 'react'
import { Container } from '@mui/material'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import { useLocation, useParams } from 'react-router-dom'
import NavigationText from '../components/navText/NavigationText'
import { capitalizeString, getHyphenedString } from '../utils/methods'
import LazyImage from '../components/images/LazyImage'
import bottleLoaderImg from '../assets/images/bottle-loader.png'
import { Typography } from '@mui/material'
import RatingProduct from '../components/products/rating/RatingProduct'
import '../assets/styles/productDetails.css'
import { useAppSelector } from '../components/hooks/store'
import CustomLink from '../components/links/CustomLink'
import { API_URL_LINK } from '../utils/constants'
import AddToCartButton from '../components/buttons/AddToCartButton'
import WishButton from '../components/buttons/WishButton'
import RatingTable from '../components/products/rating/RatingTable'
import ProductsList from '../components/products/list/ProductsList'
import { useGlobalCart } from '../components/contexts/CartContext'
import useWindowSize from '../components/hooks/useWindowSize'

/**
 * This is the page of the Product details.
 * Render all the information of a product or a combo.
 * 
 * @returns {JSX.Element} Rendered ProductDetails page.
 */
const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({})
  const [loading, setLoading] = useState(true)
  const [relatedCombos, setRelatedCombos] = useState([])
  const [relatedDrinkMixes, setRelatedDrinkMixes] = useState([])
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { widht } = useWindowSize();

  const categories = useAppSelector((state) => state.categories.categories);
  const subcategories = useAppSelector((state) => state.subcategories.subcategories);
  const currencyCode = useAppSelector((state) => state.location.currency);

  /**
   * Method to get the product category.
   * 
   * @returns {String} The corresponding category of the product.
   */
  const getCategory = () => {
    const foundCategory = categories.find(category => category._id === product.category);
    return foundCategory ? foundCategory.name : '';
  };

  /**
   * Method to get the product subcategory.
   * 
   * @returns {String} The corresponding subcategory of the product.
   */
  const getSubcategory = () => {
    const foundSubcategory = subcategories.find(subcategory => subcategory._id === product.subcategory);
    return foundSubcategory ? foundSubcategory.name : '';
  };

  /**
   * Fetch to get the product with the corresponding id.
   */
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      try {
        const response = await fetch(`${API_URL_LINK}/products/${id}?newCurrency=${currencyCode}`);
        const data = await response.json();
        setProduct(data)
        setRelatedCombos(data.combos ? data.combos : []);
        setRelatedDrinkMixes(data.drinkMixes ? data.drinkMixes : [])
        setRelatedProducts(data.items ? data.items : []);
      } catch (e) {
        console.error('Error:', error);
      }
      setLoading(false)
    }
    fetchProduct();
  }, []);

  const { userLogged } = useGlobalCart();

  return (
    <>
      <Container component={"section"} style={{ position: "relative" }}>
        <Header />

        {
          loading ? <div className='full-centered-container'><span className="loader"></span></div> : (
            <div>
              <NavigationText
                inactivePath={[{ title: "Home", href: "/" }, { title: "Products", href: `/products` }]}
                activePath={product.name}
              />
              <div className={'information'} >
                <div className='image'>
                  <LazyImage
                    src={product.imgUrl}
                    placeholderSrc={bottleLoaderImg}
                    className={"product-image-container"}
                    style={{ width: widht>560?350:280, height: widht>560?350:280 }}
                  />
                </div>
                <div className='product-info'>
                  <Typography variant='h4' fontWeight="bold" marginTop={10} marginBottom={5}>{product.name}</Typography>
                  <RatingProduct
                    rating={product.rating}
                    reviews={product.totalReviews}
                  />
                  <Typography variant='h6' marginTop={5}>
                    {product.price.currency}&nbsp;
                    {
                      Number.isInteger(product.price.value) ?
                        product.price.value :
                        parseFloat(product.price.value).toFixed(2)
                    }
                  </Typography>
                  <hr />
                  <Typography variant='h6' fontWeight="bold">Product Description</Typography>
                  <Typography textAlign={'left'}>{product.description}</Typography>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
                    <AddToCartButton product={product}></AddToCartButton>
                    <WishButton productId={id}></WishButton>
                  </div>
                </div>
              </div>
              {
                product.type === 'combo' ?
                  (<>
                    {relatedProducts.length > 0 && (
                      <div>
                        <Typography variant='h6' color={'primary'} fontWeight="bold">Products</Typography>
                        <ProductsList collection="products" products={relatedProducts}></ProductsList>
                      </div>
                    )}
                  </>)
                  :
                  (<div className='detail-list' >
                    <Typography variant='h6' color={'primary'} fontWeight="bold">Product Details</Typography>
                    <hr />
                    <div style={{ display: 'flex', width: '100%' }}>
                      <div className='detail'>
                        <Typography fontWeight="bold">Category</Typography>
                      </div>
                      <div className='detail'>
                        <CustomLink href={`/${getHyphenedString(getCategory())}`} title={getCategory()} />
                      </div>
                    </div>
                    <hr style={{ display: product.details.abv ? 'flex' : 'none' }} />
                    <div style={{ display: product.details.abv ? 'flex' : 'none', width: '100%' }}>
                      <div className='detail'>
                        <Typography fontWeight="bold">Subcategory</Typography>
                      </div>
                      <div className='detail'>
                        <CustomLink href={`/${getHyphenedString(getCategory())}/${getHyphenedString(getSubcategory())}`} title={getSubcategory()} />
                      </div>
                    </div>
                    <hr />
                    <div style={{ display: 'flex', width: '100%' }}>
                      <div className='detail'>
                        <Typography fontWeight="bold">Brand</Typography>
                      </div>
                      <div className='detail'>
                        <Typography >{product.details.brand}</Typography>
                      </div>
                    </div>
                    <hr style={{ display: product.details.abv ? 'flex' : 'none' }} />
                    <div style={{ display: product.details.abv ? 'flex' : 'none', width: '100%' }}>
                      <div className='detail'>
                        <Typography fontWeight="bold">ABV</Typography>
                      </div>
                      <div className='detail'>
                        <Typography >{product.details.abv}</Typography>
                      </div>
                    </div>
                    <hr />
                  </div>)
              }

              <RatingTable productId={id}></RatingTable> 

              {
                (product.type === 'product') &&
                <div>
                  <div>
                    {relatedCombos.length > 0 && (
                      <div>
                        <Typography variant='h6' color={'primary'} fontWeight="bold">Combos</Typography>
                        <ProductsList collection="combos" products={relatedCombos}></ProductsList>
                      </div>
                    )}
                  </div>
                  <div>
                    {relatedDrinkMixes.length > 0 && (
                      <div>
                        <Typography variant='h6' color={'primary'} fontWeight="bold">Drink Mixes</Typography>
                        <ProductsList collection="drink-mixes" products={relatedDrinkMixes}></ProductsList>
                      </div>
                    )}
                  </div>
                </div>
              }

            </div>
          )
        }
      </Container>
      <Footer />
    </>

  )
}

export default ProductDetails