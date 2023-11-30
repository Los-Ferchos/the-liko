import { useEffect, useState, useRef } from 'react';
import ProductCard from '../card/ProductCard';
import { Typography, IconButton } from '@mui/material';
import CustomLink from '../../links/CustomLink';
import { capitalizeString, getHyphenedString } from '../../../utils/methods';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import useWindowSize from '../../hooks/useWindowSize';
import ProductCarouselLoader from './ProductCarouselLoader';

function ProductCarousel({ apiUrl = "", categoryName = "", subcat, type = "client" }) {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(4)
    const [pagination, setPagination] = useState({});
    const carouselContainer = useRef();
    const { width } = useWindowSize();

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
                const response = await fetch(`${apiUrl}?page=${currentPage}&limit=${currentLimit}`);
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

    return (
    <div style={{ marginTop: 30, paddingBottom: 30 }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 1 }}>
            <Typography variant="h5" color="primary" component="h1">
                {capitalizeString(subcat.name)}
            </Typography>
            <CustomLink href={`/${categoryName}/${getHyphenedString(subcat.name)}`} title="View All" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", overflowX: "auto", padding: 15 }}>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: "50px" }}>
                <div>
                    {currentPage !== 1 && <IconButton onClick={handlePrevClick}><FaChevronLeft /></IconButton>}

                </div>
                <div>
                {currentPage < pagination?.totalPages && <IconButton onClick={handleNextClick}><FaChevronRight /></IconButton>}

                </div>
            </div>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <div ref={carouselContainer} style={{ display: "flex", flexDirection: "row", flex: 1000, justifyContent: "space-between", alignItems: "center" }}>
                    {isLoading ? (
                        <ProductCarouselLoader />
                    ) : (
                        products.map((product, index) => (
                            <div key={product._id} style={{ flex: `0 0 ${100 / calculateSlidesToShow()}%`, marginRight: "8px" }}>
                                <ProductCard
                                    product={product}
                                    className={"carousel-card"}
                                    style={{ width: "100%", height: "440px" }}
                                />
                            </div>
                        ))
                    )}
                </div>
                
            </div>
            
        </div>
    </div>
);



}

export default ProductCarousel;