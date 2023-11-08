import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from '@mui/material';
import PrevButton from '../components/buttons/PrevButton';
import NextButton from '../components/buttons/NextButton';
import ProductsDisplay from '../components/products/ProductsDisplay';
import Pagination from '../components/products/pages/Pagination';

const LIMIT = 6;
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
      <ProductsDisplay isLoading={isLoading} products={products} />
      {
        totalPages > 1 && (
          <div style={{ display: "flex", justifyContent: "center", textAlign: 'center', marginTop: '20px' }}>
            {
              currentPage > 1 && <PrevButton onClick={() => handlePageChange(currentPage - 1)}/>
            }
            <Pagination totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />
            {
              currentPage < totalPages && <NextButton onClick={() => handlePageChange(currentPage + 1)}/>
            }
          </div>
        )
      }
    </Container>
  );
};

export default Products;
