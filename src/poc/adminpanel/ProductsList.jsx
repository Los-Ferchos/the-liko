import React from 'react';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';

const ProductList = ({ products, handleEdit, handleDelete }) => {
  return (
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardContent>
              <Typography variant="h5">{product.name}</Typography>
              <Button variant="outlined" color="primary" onClick={() => handleEdit(product)}>
                Edit
              </Button>
              <Button variant="outlined" color="error" onClick={() => handleDelete(product._id)}>
                Delete
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
