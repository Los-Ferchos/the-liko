import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EcommercePage from '../components/products/EcommercePage';
import CircularProgress from '@mui/material/CircularProgress';
import { Container } from '@mui/material';

const LIMIT = 10;
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
    <Container>
      <EcommercePage products={products} />
      {isLoading && <div style={{ textAlign: 'center', marginTop: '20px' }}><CircularProgress /></div>}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            style={{
              margin: '0 5px',
              padding: '5px 10px',
              cursor: 'pointer',
              fontWeight: currentPage === page ? 'bold' : 'normal',
            }}
          >
            {page}
          </button>
        ))}
      </div>
    </Container>
  );
};

export default Products;
