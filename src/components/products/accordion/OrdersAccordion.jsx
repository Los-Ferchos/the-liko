import { useEffect, useState } from "react";
import { useGlobalCart } from "../../contexts/CartContext";
import Pagination from "../pagination/Pagination";
import PrevButton from "../../buttons/PrevButton";
import NextButton from "../../buttons/NextButton";
import { API_URL_LINK } from "../../../utils/constants";
import OrdersTable from "../table/OrdersTable";

/**
 * OrdersAccordion component displays a paginated list of user orders.
 *
 * @component
 * @returns {JSX.Element} - The rendered component.
 */
const OrdersAccordion = () => {
    const [expanded, setExpanded] = useState(-1);
    const { userLogged } = useGlobalCart();
    const [orders, setOrders] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0)
  
    /**
     * Fetches user orders from the server.
     *
     * @async
     * @function
     * @returns {Promise<void>} - A Promise that resolves once orders are fetched.
     */
    useEffect(() => {
      const fetchOrders = async () => {
        setLoading(true)
        try {
          const response = await fetch(`${API_URL_LINK}/users/${userLogged.userId}/orders?page=${currentPage}`);
          const data = await response.json();
          if (response.ok) {
            setOrders(data.orders);
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

export default OrdersAccordion;