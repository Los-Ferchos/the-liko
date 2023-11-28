import React, { useEffect, useState } from 'react';
import PrevButton from '../buttons/PrevButton';
import Pagination from './pagination/Pagination';
import NextButton from '../buttons/NextButton';
import ProductsListLoader from './list/ProductsListLoader';
import ProductsList from './list/ProductsList';
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
const ProductsDisplay = ({ apiUrl = "", page = 1, limit = 16, loading, type = "client"}) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  const isFilterRequest = useAppSelector((state) => state.sort.send);
  const sortQuery = useAppSelector((state) => state.sort.sortSelected);
  const filterQueryArray = useAppSelector((state) => state.sort.filtersSelected);
  const currencyCode = useAppSelector((state) => state.location.currency);
  const loadingCurrency = useAppSelector((state) => state.location.loading);

  function setUrlSort(link) {
    return link+sortQuery[0];
  }

  function setUrlFilter(link) {
    switch (filterQueryArray.length) {
      case 1:
        return link+`&ft1=`+filterQueryArray[0];
      case 2:
          return link+`&ft1=`+filterQueryArray[0]+`&ft2=`+filterQueryArray[1];
          case 3:
            return link+`&ft1=`+filterQueryArray[0]+`&ft2=`+filterQueryArray[1]+`&ft3=`+filterQueryArray[2];
      default:
        return link;
    }
  }

  const searchText = useAppSelector((state) => state.search.searchText);
  const search = useAppSelector((state) => state.search.search);

  /**
   * Fetches products from the specified API endpoint based on the current page and limit.
   * Updates the products, total pages, and loading state.
   *
   * @function
   * @async
   * @returns {void}
   */
  useEffect(() => {
    let apiActualLink = `${apiUrl}?page=${currentPage}&limit=${limit}&search=${searchText}&newCurrency=${currencyCode}`;
    setIsLoading(true);

    if (sortQuery.length) {
      apiActualLink = setUrlSort(apiActualLink);
    }

    if (filterQueryArray.length) {
      apiActualLink = setUrlFilter(apiActualLink);
    } 

    const fetchProducts = async () => {
      setIsLoading(true);
      if(loading) return;
      setFailed(false);
      try {
        const response = await fetch(apiActualLink);
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
  }, [isFilterRequest, currentPage, apiUrl, limit, page, loading, search, currencyCode]);

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
        <ProductsList load={loading || isLoading} products={products} failed={failed} type={type}/>
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
