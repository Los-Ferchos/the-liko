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
const ProductList = ({ cartItems, total, currencyTotal = "USD", productKey = "productInfo" }) => {
    const totalToShow = total.toFixed(2);
    
    return (
      <table className="table">
        <tr>
          <td><Typography variant='h1' ></Typography></td>
          <td><Typography variant='h6' style={{ fontWeight: "bold"}}>Title</Typography></td>
          <td><Typography variant='h6' style={{ fontWeight: "bold"}}>Quantity</Typography></td>
          <td><Typography variant='h6'style={{ fontWeight: "bold"}}><p>Unit Price </p></Typography></td>
        </tr>
        {
          cartItems.map((cartItems) => (
            <tr>
              <td><img src={cartItems[productKey].imgUrl} alt={cartItems[productKey].name} className='product-image' /></td>
              <td><Typography variant='h6'>{cartItems[productKey].name}</Typography></td>
              <td id='number'><Typography variant='h6'>{cartItems.quantity}</Typography></td>
              <td id='number'>
                <Typography variant='h6'>
                  {`${cartItems[productKey].price.currency} ${cartItems[productKey].price.value.toFixed(2)}`}
                </Typography>
              </td>
            </tr> 
          ))
        }
        <tr>
          <td colSpan={"3"}><Typography variant='h6' style={{ fontWeight: "bold"}}>Total Cost</Typography></td>
          <td id='text-center'><Typography textAlign={"center"} variant='h6' style={{ fontWeight: "bold"}}>
            {currencyTotal} {totalToShow}
          </Typography></td>
        </tr>
      </table>
    );
    };

export default ProductList;