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
import AbvSlider from './ABVSlider';

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

  const [formError, setFormError] = useState({
    name: '',
    description: '',
    stock: '',
    image: '', 
    category: '',
    subcategory: '',
    price: '',
    brand: '',
    abv: '',
    type: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleErrorMsg = (name, val) => {
    setFormError({ ...formError, [name]: val });
  };

  const handleSubmit = (e) => {
    const formErrorCopy = { ...formError }
    Object.entries(formData).forEach(([key, value]) => {
        if(value === ''){
            formErrorCopy[key] = "This field is required, please fill it";
        }
    });
    setFormError(formErrorCopy)
    e.preventDefault();
  };

  const { width, height } = useWindowSize();

  const [file, setFile] = useState("");

  return (
    <form onSubmit={handleSubmit} noValidate>
        <Grid container spacing={width > 960 ? 12 : 0}>
            <Grid item xs={12} md={6}>
                <FieldText
                    label="Name"
                    name="name"
                    placeholder='Eg: Fernet'
                    value={formData.name}
                    onChange={handleChange}
                    errorMsg={formError.name}
                    handleErrorMsg={handleErrorMsg}
                />

                <FieldText
                    label="Description"
                    name="description"
                    placeholder='Eg: Bitter alcoholic drink made from several types of herbs, which are macerated in grape alcohol.'
                    value={formData.description}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    errorMsg={formError.description}
                    handleErrorMsg={handleErrorMsg}
                />

                <FieldText
                    label="Stock"
                    name="stock"
                    type="number"
                    placeholder='Eg: 50'
                    value={formData.stock}
                    onChange={handleChange}
                    errorMsg={formError.stock}
                    handleErrorMsg={handleErrorMsg}
                />

                <ImageUploader setFile={setFile} file={file} errorMsg={formError.image}
                    handleErrorMsg={handleErrorMsg} />
            </Grid>

            <Grid item xs={12} md={6}>
                <CategoriesSubcategories 
                    formData={formData} 
                    setFormData={setFormData} 
                    handleChange={handleChange}
                    formError={formError}
                    handleErrorMsg={handleErrorMsg}
                />

                <FieldText
                    label="Price in USD"
                    name="price"
                    type="number"
                    placeholder='Eg: 15.99'
                    value={formData.price}
                    onChange={handleChange}
                    errorMsg={formError.price}
                    handleErrorMsg={handleErrorMsg}
                    typeNumber='price'
                />

                <FieldText
                    label="Brand"
                    name="brand"
                    placeholder='Eg: ABC Company'
                    value={formData.brand}
                    onChange={handleChange}
                    errorMsg={formError.brand}
                    handleErrorMsg={handleErrorMsg}
                />

                <AbvSlider value={formData.abv} handleChange={handleChange}/>

                <FieldText
                    label="Type"
                    name="type"
                    placeholder='Eg: Mint Fernet'
                    value={formData.type}
                    onChange={handleChange}
                    errorMsg={formError.type}
                    handleErrorMsg={handleErrorMsg}
                />
            </Grid>

            <Grid item xs={12} md={12}>
                <Button type="submit" variant="contained" color="primary" size='large'>
                    Save
                </Button>
            </Grid>
        </Grid>
    </form>
  );
};

export default ProductForm;
