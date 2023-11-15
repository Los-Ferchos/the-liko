import { useEffect, useState, useRef } from 'react';
import ProductCard from '../card/ProductCard';
import { Grid, Typography, Button, Card } from '@mui/material';
import CustomLink from '../../links/CustomLink';
import { capitalizeString, getHyphenedString } from '../../../utils/methods'
import { FaChevronLeft, FaChevronRight} from "react-icons/fa"
import '../../../assets/styles/carousel.css'
import useWindowSize from '../../hooks/useWindowSize';
import ProductCarouselLoader from './ProductCarouselLoader';

function ProductCarousel({ apiUrl = "", categoryName="", subcat }) {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const boxRef = useRef(null);

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
        const containerWidth = boxRef.current.clientWidth;
        boxRef.current.scrollLeft -= containerWidth-containerWidth%250;
    };

    const handleNextClick = () => {
        const containerWidth = boxRef.current.clientWidth;
        boxRef.current.scrollLeft += containerWidth-containerWidth%250;
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
                <Button className='buttons' style={{display: width<=960?'none':'block'}} onClickCapture={handlePrevClick}>
                    <FaChevronLeft className='arrows'/>
                </Button>
                <div ref={boxRef} style={{display:"flex", flexDirection:"row", overflowX:"scroll"}}>
                    {
                        isLoading ? <ProductCarouselLoader/> :
                        products.map((product, index) => (
                            <Grid key={index} p={5}>
                                <ProductCard key={product._id} product={product} className={"carousel-card"}/>
                            </Grid>
                        ))
                    }
                </div>
                <Button className='buttons' style={{display: width<=960?'none':'block'}} onClickCapture={handleNextClick}>
                    <FaChevronRight className='arrows'/>
                </Button>
            </div>
            
        </div>
    )
}

export default ProductCarousel;
