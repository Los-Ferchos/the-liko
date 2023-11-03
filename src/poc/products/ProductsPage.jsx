import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EcommercePage from './EcommercePage'; // Assume EcommercePage component is in a separate file
import CircularProgress from '@mui/material/CircularProgress';
import './style.css';

const LIMIT = 10;
const API_URL = 'http://localhost:8080/products'; // Replace this with your API endpoint

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch products from the API when the component mounts or currentPage changes
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

    fetchProducts(); // Invoke the fetchProducts function
  }, [currentPage]); // Fetch products whenever currentPage changes

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className='container'>
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
    </div>
  );
};

export default ProductPage;
