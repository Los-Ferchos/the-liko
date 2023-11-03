import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductForm from './ProductForm';
import ProductList from './ProductsList';
import { Button } from '@mui/material';

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isNew, setIsNew] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/products?limit=30');
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products: ', error);
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:8080/products/${productId}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product: ', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!isNew) return;
    try {
      // Make a POST request to the backend API endpoint with the form data
      const response = await axios.post('http://localhost:8080/products', formData);
      console.log('Product added:', response.data); // Log the response (optional)
      // Handle success (e.g., show a success message, redirect, etc.)
    } catch (error) {
      console.error('Error adding product:', error);
      // Handle error (e.g., show an error message to the user)
    }
  };
  

  console.log(products)

  return (
    <div className='container'>
      <h2>Admin Panel</h2>
      <Button variant='contained' color="success" onClick={() => {
        setSelectedProduct({})
        setIsNew(true);
      }}>
        Add Product
        </Button>
      <ProductList products={products} handleEdit={handleEdit} handleDelete={handleDelete} />
      {selectedProduct && (
        <ProductForm
          product={selectedProduct}
          onSubmit={() => {
            setIsNew(false);
            fetchProducts();
            handleSubmit();
            setSelectedProduct(null);
          }}
          onCancel={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default AdminPanel;
