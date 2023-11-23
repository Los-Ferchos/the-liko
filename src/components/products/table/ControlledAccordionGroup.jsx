import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { useGlobalCart } from '../../contexts/CartContext';
import ProductList from '../../checkout/ProductsList';
import { API_URL_LINK } from '../../../utils/constants';
import { IconButton } from '@mui/material';
import { FaChevronCircleDown, FaChevronCircleUp } from 'react-icons/fa';
import '../../../assets/styles/orders.css'

const OrdersTable = ({ orders, handleChange, expanded }) => (
  <div style={{ width: '100%' }}>
    {orders ? (
      <table style={{ width: '100%' }} className='table-orders'>
        <thead>
          <tr>
            <th>Order #</th>
            <th>Date</th>
            <th>Total Cost</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <>
              <tr key={order._id} >
                <td><Typography>{`Order #${order._id}`}</Typography></td>
                <td><Typography>{`${new Date(order.date).toISOString().substring(0, 10)}`}</Typography></td>
                <td><Typography>{`${order.currency} ${order.totalCost}`}</Typography></td>
                <td>
                  {
                    expanded === index ? (
                      <IconButton onClick={() => handleChange(-1)}>
                        <FaChevronCircleUp/>
                      </IconButton>
                    ) : (
                      <IconButton onClick={() => handleChange(index)}>
                        <FaChevronCircleDown/>
                      </IconButton>
                    )
                  }
                </td>
              </tr>
              {
                expanded === index && (
                  <div>
                    <Typography>Here will be the product data</Typography>
                  </div>
                )
              }
            </>
          ))}
        </tbody>
      </table>
    ) : (
      <Typography>No orders available</Typography>
    )}
  </div>
);

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = useState(-1);
  const { userLogged } = useGlobalCart();
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true)
      try {
        const response = await fetch(`${API_URL_LINK}/users/${userLogged.userId}/orders`);
        const data = await response.json();
        if (response.ok) {
          setOrders(data);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
      setLoading(false)
    };
    
    fetchOrders();
  }, [userLogged.userId]);

  const handleChange = (newExpanded) => {
    setExpanded(newExpanded);
  };

  return (
    <>
      {
        loading ? <div className="full-centered-container"><span className="fast-loader"></span></div>
        : (
          <OrdersTable orders={orders} handleChange={handleChange} expanded={expanded} />
        )
      }
    </>
  );
}
