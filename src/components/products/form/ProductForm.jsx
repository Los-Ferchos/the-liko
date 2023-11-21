// ProductForm.js
import React, { useState } from 'react';
import {
  Button,
  Grid,
} from '@mui/material';
import FieldText from '../../fields/FieldText';
import CategoriesSubcategories from './CategoriesSubcategories';
import useWindowSize from '../../hooks/useWindowSize';
import ImageUploader from './ImgUploader';

const ProductForm = () => {
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement form submission logic
    console.log('Form submitted:', formData);
  };

  const { width, height } = useWindowSize();

  const [file, setFile] = useState("");

  console.log(file)

  return (
    <form onSubmit={handleSubmit}>
        <Grid container spacing={width > 960 ? 12 : 0}>
            {/* Two-column layout for large and medium screens */}
            <Grid item xs={12} md={6}>
                <FieldText
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />

                <FieldText
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    multiline
                    rows={4}
                />

                <FieldText
                    label="Stock"
                    name="stock"
                    type="number"
                    value={formData.stock}
                    onChange={handleChange}
                />

                <ImageUploader setFile={setFile} file={file} />
            </Grid>

            <Grid item xs={12} md={6}>
                <CategoriesSubcategories 
                    formData={formData} 
                    setFormData={setFormData} 
                    handleChange={handleChange}
                />

                <FieldText
                    label="Price in USD"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                />

                <FieldText
                    label="Brand"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                />

                <FieldText
                    label="ABV (Alcohol By Volume)"
                    name="abv"
                    type="number"
                    value={formData.abv}
                    onChange={handleChange}
                    fullWidth
                />

                <FieldText
                    label="Type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                />
            </Grid>

            <Grid item xs={12} md={12}>
                <Button type="submit" variant="contained" color="primary">
                    Save
                </Button>
            </Grid>
        </Grid>
    </form>
  );
};

export default ProductForm;
