import { Button, Typography, Grid, Divider } from '@mui/material';
import React from 'react'
import TextOrder from './TextOrder';
import '../../assets/styles/checkout.css'
import { blue } from '@mui/material/colors';

const ProductList = (props) => {
    const cartItems = props.cartItems;
    const total = props.total;

    const totalToShow = total.toFixed(2);
    
    return (
        <>
         <table className="table">
          <tr>
            <td><Typography variant='h1' ></Typography></td>
            <td><Typography variant='h6' style={{ fontWeight: "bold"}} >Title</Typography></td>
            <td><Typography variant='h6' style={{ fontWeight: "bold"}} >Quantity</Typography></td>
            <td><Typography variant='h6'style={{ fontWeight: "bold"}} ><p>Unit Price <br />
              BOB </p></Typography></td>
          </tr>
          {
            cartItems.map((cartItems) => (
              <tr>
                <td ><img src={cartItems.productInfo.imgUrl} alt={cartItems.productInfo.name} width="50" height="50" /></td>
                <td ><Typography variant='h6'>{cartItems.productInfo.name}</Typography></td>
                <td id='number'><Typography variant='h6'>{cartItems.quantity}</Typography></td>
                <td id='number'> <Typography variant='h6'>{`${cartItems.productInfo.price.value}`}</Typography></td>
              </tr>
            ))
          }
        </table>
        <table className="table">
          <tr>
            <td><Typography variant='h6' style={{ fontWeight: "bold"}}>Total Cost</Typography></td>
            <td id='text-right'><Typography variant='h6' style={{ fontWeight: "bold"}}>{totalToShow} BOB</Typography></td>
          </tr>
        </table>
        
        
      
          
      
        </>
    );
    };

export default ProductList;