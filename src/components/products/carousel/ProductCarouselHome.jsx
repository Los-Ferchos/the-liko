import React, { useEffect, useState, useRef } from 'react';
import ProductCard from '../card/ProductCard';
import { Typography, IconButton } from '@mui/material';
import { capitalizeString, getHyphenedString } from '../../../utils/methods';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import useWindowSize from '../../hooks/useWindowSize';
import ProductCarouselLoader from './ProductCarouselLoader';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/store';

function ProductCarouselHome({ apiUrl = "", categoryName = "", subcat, type = "client", subcategoriesState }) {

    const [subcategories, setSubcategories] = useState([]);

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(4);
    const [pagination, setPagination] = useState({});
    const carouselContainer = useRef();
    const { width } = useWindowSize();
    const currencyCode = useAppSelector((state) => state.location.currency)

    useEffect(() => {
        setSubcategories(subcategoriesState);
    }, [subcategoriesState]);


    useEffect(() => {
        const uniqueSubcategories = subcategories.filter(
            (subcat, index, self) =>
                index ===
                self.findIndex((s) => s._id === subcat._id)
        );
        setSubcategories(uniqueSubcategories);
    }, [subcategories, subcategoriesState]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${apiUrl}?page=${currentPage}&limit=${currentLimit}&newCurrency=${currencyCode}`);
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data.products);
                    setPagination(data.pagination);
                }
            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
        };
        fetchProducts();
    }, [apiUrl, currentPage, currentLimit, subcat]);

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
                <Link to={`/liquors/${getHyphenedString(subcat.name)}`} >
                    <Typography>
                        View All
                    </Typography>
                </Link>
            </div>
            <div ref={carouselContainer} style={{ display: "flex", flexDirection: "row", flex: 1000, justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                <Carousel showThumbs={false} autoPlay>
                    <div style={{ display: "flex", flexDirection: "column", overflowX: "auto", padding: 15, width: "100%" }}>
                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                            <div ref={carouselContainer} style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", margin: "0 10px" }}>
                                {isLoading ? (
                                    <ProductCarouselLoader />
                                ) : (
                                    products.map((product, index) => (
                                        <div key={product._id}>
                                            <ProductCard
                                                product={product}
                                                className={"carousel-card"}
                                                style={{ width: "100%", height: "100%", maxWidth: "300px", maxHeight: "440px" }}
                                            />
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                </Carousel>
            </div>

            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: "50px" }}>
                <div>
                    {currentPage !== 1 && <IconButton onClick={handlePrevClick}><FaChevronLeft /></IconButton>}
                </div>
                <div>
                    {currentPage < pagination?.totalPages && <IconButton onClick={handleNextClick}><FaChevronRight /></IconButton>}
                </div>
            </div>
        </div>
    );
}

export default ProductCarouselHome;
