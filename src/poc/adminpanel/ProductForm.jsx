import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const ProductForm = ({ product, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(product);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission and API requests here
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        margin="normal"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        margin="normal"
        multiline
        rows={4}
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <TextField
        label="Price"
        variant="outlined"
        fullWidth
        margin="normal"
        type="number"
        name="price"
        value={formData.price != null ? formData.price.value : 0}
        onChange={handleChange}
        required
      />

      <TextField
        label="Quantity"
        variant="outlined"
        fullWidth
        margin="normal"
        type="number"
        name="quantity"
        value={formData.quantity}
        onChange={handleChange}
        required
      />

      <TextField
        label="Category"
        variant="outlined"
        fullWidth
        margin="normal"
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
      />

      <TextField
        label="Subcategory"
        variant="outlined"
        fullWidth
        margin="normal"
        name="subcategory"
        value={formData.subcategory}
        onChange={handleChange}
        required
      />

      <Box mt={2}>
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
        <Button onClick={onCancel} variant="contained" color="error" style={{ marginLeft: 10 }}>
          Cancel
        </Button>
      </Box>
    </form>
  );
};

export default ProductForm;
