// AddProductFormPage.js
import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
} from '@mui/material';
import { API_URL_LINK } from '../utils/constants';

const AddProductFormPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    stock: 1,
    image: null, 
    category: '',
    subcategory: '',
    price: 1,
    brand: '',
    abv: 0,
    type: '',
  });

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL_LINK}/categories`);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []); 

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    const fetchSubcategories = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL_LINK}/subcategories?category=${selectedCategory}`);
        const data = await response.json();
        setSubcategories(data);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
        // Handle error
      } finally {
        setLoading(false);
      }
    };

    // Fetch subcategories only if a category is selected
    if (selectedCategory) {
      fetchSubcategories();
    } else {
      setSubcategories([]);
    }

    setFormData({ ...formData, category: selectedCategory, subcategory: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement form submission logic
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        fullWidth
      />

      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
        fullWidth
        multiline
        rows={4}
      />

      <TextField
        label="Stock"
        name="stock"
        type="number"
        value={formData.stock}
        onChange={handleChange}
        required
        fullWidth
      />

      {/* Add image upload component here */}

      <FormControl fullWidth>
        <InputLabel>Category</InputLabel>
        <Select
          value={formData.category}
          onChange={handleCategoryChange}
          required
        >
          {loading && <MenuItem value="" disabled>Loading Categories...</MenuItem>}
          {!loading && <MenuItem value="" disabled>Select a Category</MenuItem>}
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {formData.category && (
        <FormControl fullWidth>
          <InputLabel>Subcategory</InputLabel>
          <Select
            value={formData.subcategory}
            onChange={handleChange}
            name="subcategory"
            required
          >
            {loading && <MenuItem value="" disabled>Loading Subcategories...</MenuItem>}
            {!loading && <MenuItem value="" disabled>Select a Subcategory</MenuItem>}
            {subcategories.map((subcategory) => (
              <MenuItem key={subcategory.id} value={subcategory.id}>
                {subcategory.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      <TextField
        label="Price in USD"
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        required
        fullWidth
      />

      <TextField
        label="Brand"
        name="brand"
        value={formData.brand}
        onChange={handleChange}
        required
        fullWidth
      />

      <TextField
        label="ABV (Alcohol By Volume)"
        name="abv"
        type="number"
        value={formData.abv}
        onChange={handleChange}
        fullWidth
      />

      <TextField
        label="Type"
        name="type"
        value={formData.type}
        onChange={handleChange}
        required
        fullWidth
      />

      <Button type="submit" variant="contained" color="primary">
        Save
      </Button>
    </form>
  );
};

export default AddProductFormPage;
