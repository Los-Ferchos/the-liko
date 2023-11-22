import React, { useEffect, useState } from 'react';
import PrevButton from '../buttons/PrevButton';
import Pagination from './pagination/Pagination';
import NextButton from '../buttons/NextButton';
import ProductsListLoader from './list/ProductsListLoader';
import ProductsList from './list/ProductsList';
import { useDispatch } from 'react-redux';
import { setActualApiLink } from '../../store/sortSlice';
import { useAppSelector } from '../hooks/store';

/**
 * Displays a paginated list of products fetched from the specified API endpoint.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.apiUrl - The API endpoint URL for fetching products.
 * @param {number} [props.page=1] - The current page number for pagination (default is 1).
 * @param {number} [props.limit=16] - The number of products to display per page (default is 16).
 * @param {boolean} props.loading - The loading indicates if there is a method still being loaded before getting the products
 * 
 * @returns {JSX.Element} Rendered ProductsDisplay component.
 */
const ProductsDisplay = ({ apiUrl = "", page = 1, limit = 16, loading }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [failed, setFailed] = useState(false);


  const sortQuery = useAppSelector((state) => state.sort.sortSelected);
  const filterQueryArray = useAppSelector((state) => state.sort.filtersSelected);
  const [actualUrl, setUrl] = useState(`${apiUrl}?page=${currentPage}&limit=${limit}`);


  const setUrlSort = async () => {
    await setUrl(`${apiUrl}?page=${currentPage}&limit=${limit}&sort=1`)
  }

  /**
   * Fetches products from the specified API endpoint based on the current page and limit.
   * Updates the products, total pages, and loading state.
   *
   * @function
   * @async
   * @returns {void}
   */
  useEffect(() => {
    setIsLoading(true);

    if (sortQuery.length) {
      setUrlSort()
    }

    const fetchProducts = async () => {
      setIsLoading(true);
      if(loading) return;
      setFailed(false);
      try {
        const response = await fetch(actualUrl);
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
  }, [sortQuery, actualUrl, currentPage, apiUrl, limit, page, loading]);


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setActualApiLink({actualUrl}));
  }, [actualUrl])

  
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
      {(isLoading || loading) ? 
        <ProductsListLoader /> : 
        <ProductsList load={loading || isLoading} products={products} failed={failed} />
      }

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
