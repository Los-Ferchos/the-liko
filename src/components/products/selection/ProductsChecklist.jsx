import { Avatar, Checkbox, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { API_URL_LINK } from '../../../utils/constants';
import PrevButton from '../../buttons/PrevButton';
import NextButton from '../../buttons/NextButton';
import Pagination from '../pagination/Pagination';
import useWindowSize from '../../hooks/useWindowSize';

/**
 * Represents a checklist component for selecting products.
 *
 * @component
 * @param {Object} props - The component properties.
 * @param {string} props.label - The label for the checklist.
 * @param {string} props.errorMessage - The error message to display.
 * @param {string[]} props.items - The selected items.
 * @param {function} props.setItems - Function to set selected items.
 * @param {function} props.clearError - Function to clear the error.
 * @returns {JSX.Element} - The rendered checklist component.
 */
const ProductsChecklist = (
    { label = "", errorMessage = "", items = [], setItems = () => {}, clearError = () => {} }
) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetch(`${API_URL_LINK}/all-products?page=${currentPage}&search=${searchText}&type=product`);
        if (!response.ok) {
          setFailed(true);
          return;
        }

        const data = await response.json();
        setProducts(data.products);
        setTotalPages(data.pagination.totalPages)
      } catch (error) {
        setFailed(true);
      }
      setLoading(false)
    };

    fetchData();
  }, [currentPage, searchText]);

  /**
   * Handles the toggle of a product in the checklist.
   *
   * @function
   * @param {string} productId - The ID of the product.
   * @returns {void}
   */
  const handleToggle = (productId) => {
    clearError();
    if(!items.includes(productId)) setItems([...items, productId])
    else setItems(items.filter(id => id !== productId));
  };

  /**
   * Handles the change of the current page.
   *
   * @function
   * @param {number} newPage - The new page number.
   * @returns {void}
   */
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const { width } = useWindowSize();

  return (
    <div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: width > 960 ? -8 : 12, marginBottom: 4 }}>
            <Typography 
                marginLeft={3} 
                variant="subtitle1" 
                color={"#555"} 
                marginRight={6}
            >
                {label}
            </Typography>
            { loading && <CircularProgress size={24} /> }
        </div>
        { failed && 
            <Typography color="error">Failed to fetch products, please reload the page to try again.</Typography>
        }
        <TextField
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder='Search a product'
            fullWidth
        />
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                <TableRow>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {products.map((product) => (
                    <TableRow key={product._id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>
                        <Avatar alt={product.name} src={product.imgUrl} />
                    </TableCell>
                    <TableCell>{product.price.currency} {product.price.value}</TableCell>
                    <TableCell>
                        <Checkbox
                        edge="end"
                        checked={items.includes(product._id)}
                        onChange={() => handleToggle(product._id)}
                        />
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        {(totalPages > 1 ) && (
            <div style={{ display: "flex", justifyContent: "center", textAlign: 'center', marginTop: '20px' }}>
                {currentPage > 1 && <PrevButton onClick={() => handlePageChange(currentPage - 1)} />}
                <Pagination totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />
                {currentPage < totalPages && <NextButton onClick={() => handlePageChange(currentPage + 1)} />}
            </div>
        )}
        <Typography marginLeft={6} color={"error"} variant="body2" textAlign={"left"}>{errorMessage}</Typography>
    </div>
  );
};

export default ProductsChecklist;
