import React, { useEffect, useState } from 'react';
import PrevButton from '../buttons/PrevButton';
import Pagination from './pagination/Pagination';
import NextButton from '../buttons/NextButton';
import ProductsListLoader from './list/ProductsListLoader';
import ProductsList from './list/ProductsList';

/**
 * Displays a paginated list of products fetched from the specified API endpoint.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.apiUrl - The API endpoint URL for fetching products.
 * @param {number} [props.page=1] - The current page number for pagination (default is 1).
 * @param {number} [props.limit=16] - The number of products to display per page (default is 16).
 * 
 * @returns {JSX.Element} Rendered ProductsDisplay component.
 */
const ProductsDisplay = ({ apiUrl = "", page = 1, limit = 16 }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  /**
   * Fetches products from the specified API endpoint based on the current page and limit.
   * Updates the products, total pages, and loading state.
   *
   * @function
   * @async
   * @returns {void}
   */
  useEffect(() => {
    setFailed(false);
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${apiUrl}?page=${page}&limit=${limit}`);
        if (response.ok) {
          const data = await response.json();
          setProducts(data.products);
          setTotalPages(data.pagination.totalPages);
        } else {
          setFailed(true);
        }
      } catch (error) {
        setFailed(true);
      }
      setIsLoading(false);
    };
  
    fetchProducts();
  }, [currentPage, apiUrl, limit, page]);
  
  /**
   * Handles the change of the current page.
   *
   * @function
   * @param {number} newPage - The new page number.
   * @returns {void}
   */
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {isLoading ? <ProductsListLoader /> : <ProductsList products={products} failed={failed} />}

      {(totalPages > 1 && !failed) && (
        <div style={{ display: "flex", justifyContent: "center", textAlign: 'center', marginTop: '20px' }}>
          {currentPage > 1 && <PrevButton onClick={() => handlePageChange(currentPage - 1)} />}
          <Pagination totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />
          {currentPage < totalPages && <NextButton onClick={() => handlePageChange(currentPage + 1)} />}
        </div>
      )}
    </div>
  );
};

export default ProductsDisplay;
