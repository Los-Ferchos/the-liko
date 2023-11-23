import { Typography } from '@mui/material';
import React from 'react'
import '../../assets/styles/checkout.css'

/**
 * A React component that displays a list of cart items and their corresponding totals.
 *
 * @param {object[]} cartItems - An array of cart items, each containing a productInfo object and a quantity property.
 * @param {number} total - The total cost of all cart items.
 *
 * @return {React.Component} A React component representing the product list.
 */
const ProductList = (props) => {
    const cartItems = props.cartItems;
    const total = props.total;

    const totalToShow = total.toFixed(2);
    
    return (
        <>
         <table className="table">
          <tr>
            <td className='image-tr'><Typography variant='h1' ></Typography></td>
            <td><Typography variant='h6' style={{ fontWeight: "bold"}} >Title</Typography></td>
            <td><Typography variant='h6' style={{ fontWeight: "bold"}} >Quantity</Typography></td>
            <td><Typography variant='h6'style={{ fontWeight: "bold"}} ><p>Unit Price </p></Typography></td>
          </tr>
          {
            cartItems.map((cartItems) => (
              <tr>
                <td className='image-tr' ><img src={cartItems.productInfo.imgUrl} alt={cartItems.productInfo.name} width="50" height="50" /></td>
                <td ><Typography variant='h6'>{cartItems.productInfo.name}</Typography></td>
                <td id='number'><Typography variant='h6'>{cartItems.quantity}</Typography></td>
                <td id='number'> <Typography variant='h6'>{`USD ${cartItems.productInfo.price.value}`}</Typography></td>
              </tr> 
            ))
          }
        </table>
        <table className="table">
          <tr>
            <td><Typography variant='h6' style={{ fontWeight: "bold"}}>Total Cost</Typography></td>
            <td id='text-right'><Typography variant='h6' style={{ fontWeight: "bold"}}>{totalToShow} USD</Typography></td>
          </tr>
        </table>
        </>
    );
    };

export default ProductList;