import { useEffect, useState, useRef } from 'react';
import ProductCard from '../card/ProductCard';
import { Grid, Typography, IconButton } from '@mui/material';
import CustomLink from '../../links/CustomLink';
import { capitalizeString, getHyphenedString } from '../../../utils/methods'
import { FaChevronLeft, FaChevronRight} from "react-icons/fa"
import '../../../assets/styles/carousel.css'
import useWindowSize from '../../hooks/useWindowSize';
import ProductCarouselLoader from './ProductCarouselLoader';

/**
 * Displays the obtained products from the correspond API in a carousel of product cards.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.apiUrl - The API endpoint URL for fetching products.
 * @param {string} categoryName - The category to get the products from the API.
 * @param {Object} subcat - The subcategory to get the products from the API.
 * @returns {JSX.Element} Rendered ProductCarousel component.
 */
function ProductCarousel({ apiUrl = "", categoryName="", subcat }) {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const carouselContainer = useRef();
    const cardContainer = useRef();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
              const response = await fetch(`${apiUrl}`);
              if (response.ok) {
                const data = await response.json();
                setProducts(data.products);
              }
            } catch (error) {
              console.log(error)
            }
            setIsLoading(false);
          };
        fetchProducts();
    }, [apiUrl])

    const { width } = useWindowSize();

    const handlePrevClick = () => {
        const containerWidth = carouselContainer.current.clientWidth;
        carouselContainer.current.scrollLeft -= containerWidth-containerWidth%cardContainer.current.clientWidth;
    };

    const handleNextClick = () => {
        const containerWidth = carouselContainer.current.clientWidth;
        carouselContainer.current.scrollLeft += containerWidth-containerWidth%cardContainer.current.clientWidth;
    };

    return(
        <div style={{marginTop:30}}>
            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", padding:15}}>
            <Typography variant='h6' color='primary' component='h1'>
                {capitalizeString(subcat.name)}
            </Typography>
            <CustomLink
                href={`/${categoryName}/${getHyphenedString(subcat.name)}`}
                title='View All'
            /> 
            </div>
            <div style={{display:"flex", flexDirection:"row", padding:15, alignItems:"center"}}>    
                <IconButton className='buttons' style={{display: width<=960?'none':'flex'}} onClick={handlePrevClick}>
                    <FaChevronLeft className='arrows'/>
                </IconButton>
                <div ref={carouselContainer} style={{display:"flex", flexDirection:"row", overflowX:"scroll", scrollBehavior:"smooth"}}>
                    {
                        isLoading ? <ProductCarouselLoader/> :
                        products.map((product, index) => (
                            <Grid key={index} p={5} ref={cardContainer}>
                                <ProductCard key={product._id} product={product} className={"carousel-card"}/>
                            </Grid>
                        ))
                    }
                </div>
                <IconButton className='buttons' style={{display: width<=960?'none':'flex'}} onClick={handleNextClick}>
                    <FaChevronRight className='arrows'/>
                </IconButton>
            </div>
            
        </div>
    )
}

export default ProductCarousel;
