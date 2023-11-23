import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { useGlobalCart } from '../../contexts/CartContext';
import ProductList from '../../checkout/ProductsList';
import { API_URL_LINK } from '../../../utils/constants';
import { IconButton } from '@mui/material';
import { FaChevronCircleDown, FaChevronCircleUp } from 'react-icons/fa';
import '../../../assets/styles/orders.css'
import PrevButton from '../../buttons/PrevButton';
import NextButton from '../../buttons/NextButton';
import Pagination from '../pagination/Pagination';

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
            <React.Fragment key={order._id}>
              <tr 
                className={expanded === index ? "active" : ""} 
                onClick={() => handleChange(expanded === index ? -1 : index)}
              >
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
                  <tr>
                    <td colSpan="4">
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
                        <Typography variant='subtitle1' fontWeight={"bold"}>Shipping address:&nbsp;&nbsp;</Typography>
                        <Typography variant='subtitle1'>{order.address}</Typography>
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

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = useState(-1);
  const { userLogged } = useGlobalCart();
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true)
      try {
        const response = await fetch(`${API_URL_LINK}/users/${userLogged.userId}/orders?page=${currentPage}`);
        const data = await response.json();
        if (response.ok) {
          setOrders(data.orders);
          console.log(data.orders)
          setPagination(data.pagination)
          setTotalPages(data.pagination.totalPages)
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
      setLoading(false)
    };
    
    fetchOrders();
  }, [userLogged.userId, currentPage]);

  const handleChange = (newExpanded) => {
    setExpanded(newExpanded);
  };

   /**
   * Handles the change of the current page.
   *
   * @function
   * @param {number} newPage - The new page number.
   * @returns {void}
   */
   const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {
        loading ? <div className="full-centered-container"><span className="fast-loader"></span></div>
        : (
          <>
            <OrdersTable 
              orders={orders} 
              handleChange={handleChange} 
              expanded={expanded} 
              currentPage={currentPage} 
              setCurrentPage={setCurrentPage} 
            />
            {
              totalPages > 1 && (
                <div style={{ display: "flex", justifyContent: "center", textAlign: 'center', marginTop: '20px' }}>
                  {currentPage > 1 && <PrevButton onClick={() => handlePageChange(currentPage - 1)} />}
                  <Pagination totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />
                  {currentPage < totalPages && <NextButton onClick={() => handlePageChange(currentPage + 1)} />}
                </div>
              )
            }
          </>
        )
      }
    </>
  );
}
