import React from 'react';
import Typography from '@mui/material/Typography';
import ProductList from '../../checkout/ProductsList';
import { IconButton } from '@mui/material';
import { FaChevronCircleDown, FaChevronCircleUp } from 'react-icons/fa';
import '../../../assets/styles/orders.css'
import useWindowSize from '../../hooks/useWindowSize';

/**
 * OrdersTable component displays a table of orders with details such as order number, date, total cost, and shipping address.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object[]} props.orders - The array of orders to display.
 * @param {function} props.handleChange - The function to handle changes in the expanded state.
 * @param {number} props.expanded - The index of the expanded order.
 * @returns {JSX.Element} - The rendered component.
 */
const OrdersTable = ({ orders, handleChange, expanded, currentPage }) => {
  const { width } = useWindowSize();
  return (
    <div style={{ width: '100%' }}>
      {orders ? (
        <table style={{ width: '100%' }} className='table-orders'>
          {
            width > 600 && (
              <thead>
                <tr>
                  <th><Typography variant='h7' >Order #</Typography></th>
                  <th><Typography variant='h7' >Date</Typography></th>
                  <th><Typography variant='h7' >Total cost</Typography></th>
                  <th></th>
                </tr>
              </thead>
            )
          }
          <tbody>
            {orders.map((order, index) => (
              <React.Fragment key={order._id}>
                <tr 
                  className={expanded === index ? "active" : ""} 
                  onClick={() => handleChange(expanded === index ? -1 : index)}
                >
                  {
                    width > 600 ? (
                      <>
                        <td style={{ textAlign: "center" }}>
                          <Typography variant='body1' textAlign="center">{`Order #${order._id}`}</Typography>
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <Typography variant='body1' textAlign="center">
                            {`${new Date(order.date).toISOString().substring(0, 10)}`}
                          </Typography>
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <Typography variant='body1' textAlign="center">
                            {`${order.currency} ${order.totalCost.toFixed(2)}`}
                          </Typography>
                        </td>
                      </>
                    ) : (
                      <td style={{ padding: "4px 20px"}}>
                        <div>
                          <Typography variant='caption' textAlign="center">{`Order #${index}`}</Typography>
                        </div>
                        <div>
                          <Typography variant='caption' fontWeight={"bold"}>Date: </Typography>
                          <Typography variant='caption' textAlign="center">
                            {`${new Date(order.date).toISOString().substring(0, 10)}`}
                          </Typography>
                        </div>
                        <div>
                          <Typography variant='caption' fontWeight={"bold"}>Total Cost: </Typography>
                          <Typography variant='caption' textAlign="center">
                            {`${order.currency} ${order.totalCost.toFixed(2)}`}
                          </Typography>
                        </div>
                      </td>
                    )
                  }
                  <td style={{ height: "100%", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {
                      expanded === index ? (
                        <IconButton size='small' onClick={() => handleChange(-1)}>
                          <FaChevronCircleUp/>
                        </IconButton>
                      ) : (
                        <IconButton size='small' onClick={() => handleChange(index)}>
                          <FaChevronCircleDown/>
                        </IconButton>
                      )
                    }
                  </td>
                </tr>
                {
                  expanded === index && (
                    <tr>
                      <td colSpan="4" style={{ maxWidth: '200px' }}>
                        <div style={{ paddingRight: 20 }}>
                          <Typography variant='subtitle1' fontWeight={"bold"}>Shipping address:&nbsp;&nbsp;</Typography>
                          <Typography variant='subtitle1' style={{ paddingLeft: 20, paddingRight: 20 }}>{order.address}</Typography>
                        </div>
                        <ProductList
                          cartItems={order.items}
                          total={order.totalCost}
                          currencyTotal={order.currency}
                          productKey="productId"
                        />
                      </td>
                    </tr>
                  )
                }
              </React.Fragment>
            ))}
          </tbody>
        </table>
      ) : (
        <Typography>No orders available</Typography>
      )}
    </div>
  );
}

export default OrdersTable;