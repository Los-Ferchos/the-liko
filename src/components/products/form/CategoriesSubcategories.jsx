import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { API_URL_LINK } from '../../../utils/constants';
import FieldText from '../../fields/FieldText';

const CategoriesSubcategories = ({ formData, setFormData, handleChange }) => {
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
      const selectedCategory = e.target.value
      const fetchSubcategories = async () => {
        setLoading(true);
        try {
          const response = await fetch(`${API_URL_LINK}/categories/${selectedCategory}/subcategories`);
          const data = await response.json();
          setSubcategories(data);
        } catch (error) {
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

    return (
        <>
            <FieldText
                label="Category"
                name="category"
                select
                value={formData.category}
                required
                fullWidth
                onChange={handleCategoryChange}
            >

                {loading && <MenuItem value="" disabled>Loading Categories...</MenuItem>}
                  {!loading && <MenuItem value="" disabled>Select a Category</MenuItem>}
                  {categories.map((category) => (
                    <MenuItem 
                      fullWidth
                      color={formData.category === category._id ? "primary" : "black"} 
                      key={category._id} 
                      value={category._id}
                    >
                      {category.name}
                    </MenuItem>
                  ))}                  
            </FieldText>



            {formData.category && subcategories.length > 0 && (
                <FieldText
                    label="Subcategory"
                    name="subcategory"
                    select
                    value={formData.subcategory}
                    onChange={handleChange}
                    required
                    fullWidth
                >
                    {loading && <MenuItem value="" disabled>Loading Subcategories...</MenuItem>}
                    {!loading && <MenuItem value="" disabled>Select a Subcategory</MenuItem>}
                    {subcategories.map((subcategory) => (
                        <MenuItem style={{ display: "block"}} key={subcategory._id} value={subcategory._id}>
                            {subcategory.name}
                        </MenuItem>
                    ))}
                </FieldText>
            )}
        </>
    )
}

export default CategoriesSubcategories