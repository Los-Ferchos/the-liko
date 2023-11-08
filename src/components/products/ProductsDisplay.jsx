import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PrevButton from '../buttons/PrevButton';
import Pagination from './pages/Pagination';
import NextButton from '../buttons/NextButton';
import ProductsListLoader from './list/ProductsListLoader';
import ProductsList from './list/ProductsList';

const ProductsDisplay = (
    { apiUrl = "", page = 1, limit = 16 }
  ) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${apiUrl}?page=${page}&limit=${limit}`);
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
    <div>
      {isLoading ? <ProductsListLoader/> : <ProductsList products={products} /> }
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
    </div>
  );
};

export default ProductsDisplay;
