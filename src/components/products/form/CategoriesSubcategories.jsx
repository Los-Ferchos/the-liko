import { CircularProgress, MenuItem, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { API_URL_LINK } from '../../../utils/constants';
import FieldText from '../../fields/FieldText';

/**
 * CategoriesSubcategories component for selecting categories and subcategories.
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.formData - The form data object containing category and subcategory values.
 * @param {function} props.setFormData - The function to update the form data.
 * @param {function} props.handleChange - The callback function to handle form field changes.
 * @returns {JSX.Element} - The rendered CategoriesSubcategories component.
 */
const CategoriesSubcategories = (
    { formData, setFormData, handleChange, formError, handleErrorMsg, setNonRequiredFields, nonRequiredFields }
) => {
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingSub, setLoadingSub] = useState(false);
  
    useEffect(() => {
        /**
         * Fetches categories from the API.
         * @async
         * @function
         */
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
  
    /**
     * Handles the change of the selected category.
     * @param {Object} e - The change event.
     */
    const handleCategoryChange = (e) => {
        handleErrorMsg('subcategory', '')
        const selectedCategory = e.target.value;
        handleErrorMsg("category", '')

        /**
         * Fetches subcategories for the selected category from the API.
         * @async
         * @function
         */
        const fetchSubcategories = async () => {
            setLoadingSub(true);
            try {
                const response = await fetch(`${API_URL_LINK}/categories/${selectedCategory}/subcategories`);
                const data = await response.json();
                if(data.length > 0){
                    const nonRequiredFieldsCopy = nonRequiredFields.filter(field => field != "subcategory")
                    setNonRequiredFields(nonRequiredFieldsCopy);
                } else setNonRequiredFields([...nonRequiredFields, "subcategory"])
                setSubcategories(data);
            } catch (error) {
                console.error('Error fetching subcategories:', error);
            } finally {
                setLoadingSub(false);
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
                errorMsg={formError.category}
                handleErrorMsg={handleErrorMsg}
            >
                {loading && <MenuItem value="" disabled>Loading Categories...</MenuItem>}
                {!loading && <MenuItem value="" disabled>Select a Category</MenuItem>}
                {categories.map((category) => (
                    <MenuItem
                        color={formData.category === category._id ? "primary" : "black"} 
                        key={category._id} 
                        value={category._id}
                    >
                        {category.name}
                    </MenuItem>
                ))}                  
            </FieldText>

            {loadingSub && (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: 12
                    }}
                >
                    <CircularProgress size={24}/>
                    <Typography variant='body2' marginLeft={8}>Checking if there are subcategories available...</Typography>
                </div>
            )}

            {formData.category && subcategories.length > 0 && (
                <FieldText
                    label="Subcategory"
                    name="subcategory"
                    select
                    value={formData.subcategory}
                    onChange={handleChange}
                    errorMsg={formError.subcategory}
                    handleErrorMsg={handleErrorMsg}
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

export default CategoriesSubcategories;
