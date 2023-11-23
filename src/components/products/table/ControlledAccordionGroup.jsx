import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { useGlobalCart } from '../../contexts/CartContext';
import ProductList from '../../checkout/ProductsList';
import { API_URL_LINK } from '../../../utils/constants';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const OrdersTable = ({ orders, handleChange, expanded }) => (
  <div>
    {orders ? (
      orders.map((order, index) => (
        <Accordion key={index} expanded={expanded === `panel${index + 1}`} onChange={handleChange(`panel${index + 1}`)}>
          <AccordionSummary aria-controls={`panel${index + 1}d-content`} id={`panel${index + 1}d-header`}>
            <Typography>{`Order #${index + 1}`}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <ProductList cartItems={order.cartItems} total={order.total} />
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))
    ) : (
      <Typography>No orders available</Typography>
    )}
  </div>
);

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = useState(null);
  const { cartItems, userLogged } = useGlobalCart();
  const [orders, setOrders] = useState(null);


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${API_URL_LINK}/users/${userLogged.userId}/orders`);
        const data = await response.json();
        if (data.orders) {
          setOrders(data.orders);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    
    fetchOrders();
  }, [userLogged.userId]);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return <OrdersTable orders={orders} handleChange={handleChange} expanded={expanded} />;
}
