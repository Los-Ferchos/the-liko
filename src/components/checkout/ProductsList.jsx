import { Button, Typography, Grid } from '@mui/material';
import React from 'react'
import TextOrder from './TextOrder';
import '../../assets/styles/checkout.css'

const ProductList = ({subtotal}) => {
    
    return (
        <>
        <TextOrder TitleLeft='Subtotal' TitleRight={`USD ${subtotal}`} />
        <Grid item xs={12}>
          <Button variant='contained' color='primary'>
            Place Order
          </Button>
        </Grid>
        </>
    );
    };

export default ProductList;