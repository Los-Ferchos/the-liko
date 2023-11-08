import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EcommercePage from '../components/products/ProductsDisplay';
import CircularProgress from '@mui/material/CircularProgress';
import { Container } from '@mui/material';
import ProductsGridLoader from '../components/products/list/ProductListLoader';
import PageButton from '../components/buttons/PageButton';
import PrevButton from '../components/buttons/PrevButton';
import NextButton from '../components/buttons/NextButton';

const LIMIT = 1;
const API_URL = 'http://localhost:8080/products';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${API_URL}?page=${currentPage}&limit=${LIMIT}`);
        setProducts(response.data.products);
        setTotalPages(response.data.pagination.totalPages);
      } catch (error) {
        console.error('Error fetching products: ', error);
      }
      setIsLoading(false);
    };

    fetchProducts();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Container component={"section"}>
      <EcommercePage isLoading={isLoading} products={products} />
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        {
          currentPage > 1 && <PrevButton onClick={() => handlePageChange(currentPage - 1)}/>
        }
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <PageButton key={page} isCurrent={currentPage === page} page={page} onClick={() => handlePageChange(page)} />
        ))}
        {
          currentPage < totalPages && <NextButton onClick={() => handlePageChange(currentPage + 1)}/>
        }
      </div>
    </Container>
  );
};

export default Products;
