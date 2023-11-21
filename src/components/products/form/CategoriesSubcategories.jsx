import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
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
      const selectedCategory = e.target.value;
      const fetchSubcategories = async () => {
        setLoading(true);
        try {
          const response = await fetch(`${API_URL_LINK}/categories/${selectedCategory}/subcategories`);
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

    return (
        <>
        <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Age</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={10}
    label="Age"
  >
    <div>
    <div style={{ width: "100vw", display: "block" }} value={10}>Ten</div>
    <div style={{ width: "100vw", display: "block" }} value={20}>Twenty</div>
    <div style={{ width: "100vw", display: "block" }} value={30}>Thirty</div>
    </div>
  </Select>
</FormControl>
            <FieldText
                label="Category"
                name="category"
                select
                value={formData.category}
                onChange={handleCategoryChange}
                required
                fullWidth
            >
                {loading && <MenuItem full value="" disabled>Loading Categories...</MenuItem>}
                {!loading && <MenuItem value="" disabled>Select a Category</MenuItem>}
                {categories.map((category) => (
                        <MenuItem key={category._id} value={category._id} dense>
                        {category.name}
                    </MenuItem>
                ))}
            </FieldText>

            {formData.category && (
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