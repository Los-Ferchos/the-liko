import { useEffect, useState, useRef } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import ProductCard from '../card/ProductCard';
import { Typography, IconButton } from '@mui/material';
import CustomLink from '../../links/CustomLink';
import { capitalizeString, getHyphenedString } from '../../../utils/methods';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import useWindowSize from '../../hooks/useWindowSize';
import ProductCarouselLoader from './ProductCarouselLoader';
import { useAppSelector } from '../../hooks/store';

function ProductCarousel({ apiUrl = "", categoryName = "", subcat, type = "client" }) {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(4)
    const [pagination, setPagination] = useState({});
    const carouselContainer = useRef();
    const { width } = useWindowSize();
    const currencyCode = useAppSelector((state) => state.location.currency)

    const calculateSlidesToShow = () => {
        if (width < 600) {
            return 1;
        } else if (width < 900) {
            return 2;
        } else {
            return Math.min(products.length, 4); 
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${apiUrl}?page=${currentPage}&limit=${currentLimit}&newCurrency=${currencyCode}`);
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data.products);
                    setPagination(data.pagination)
                }
            } catch (error) {
                console.log(error)
            }
            setIsLoading(false);
        };
        fetchProducts();
    }, [apiUrl, currentPage, currentLimit])

    const handlePrevClick = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleNextClick = () => {
        setCurrentPage(currentPage + 1);
    };

      // Calculate the number of items to show based on the screen width
  const calculateItemsToShow = () => {
    if (width > 1200) {
      return 3;
    } else if (width > 600) {
      return 2;
    } else {
      return 1;
    }
  };

  const itemsToShow = calculateItemsToShow();

    return (
    <div style={{ marginTop: 30, paddingBottom: 30 }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 1 }}>
            <Typography variant="h5" color="primary" component="h1">
                {capitalizeString(subcat.name)}
            </Typography>
            <CustomLink href={`/${categoryName}/${getHyphenedString(subcat.name)}`} title="View All" />
        </div>
        <div style={{ padding: 15 }}>
        <AliceCarousel
          items={isLoading ? [<ProductCarouselLoader />] : products.map((product, index) => (
            <div style={{ width: width > 1200 ? "20vw" : "90vw"}}>
                <ProductCard
              key={index}
              product={product}
              isSlide
            />
            </div>
          ))}
          autoPlay
          buttonsDisabled={true} // Disable next/prev buttons
          mouseTracking
          infinite
          disableDotsControls // Another way to disable dots
          disableButtonsControls // Hide navigation arrows
          responsive={{ [itemsToShow]: { items: itemsToShow } }}
        />
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: "50px" }}>
                <div>
                    {currentPage !== 1 && <IconButton onClick={handlePrevClick}><FaChevronLeft /></IconButton>}
                </div>
                <div>
                {currentPage < pagination?.totalPages && <IconButton onClick={handleNextClick}><FaChevronRight /></IconButton>}
                </div>
            </div>
        </div>
    </div>
);
}

export default ProductCarousel;