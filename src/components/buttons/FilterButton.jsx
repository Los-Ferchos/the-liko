import React from 'react';
import '../../assets/styles/filter.css'
import { useDispatch } from 'react-redux';
import { clearAll, sendOrders } from '../../store/sortSlice';

/**
 * A React component representing a button to clear filters and send orders.
 * Uses Redux dispatch to trigger actions for clearing filters and sending orders.
 * 
 * @component
 * @returns {JSX.Element} The JSX representation of the FilterButton component.
 */
const FilterButton = () => {
    /**
     * Redux dispatch function.
     * @type {function}
     */
    const dispatch = useDispatch();
  
    /**
     * Asynchronously clears all filters and sends orders.
     * 
     * @async
     * @function
     * @throws {Error} If an error occurs during the dispatch of actions.
     */
    const clearFilters = async () => {
      try {
        dispatch(clearAll());
        dispatch(sendOrders());
      } catch (error) {
        console.error('Error while clearing filters and sending orders:', error);
        throw new Error('Error clearing filters and sending orders: ' + error.message);
      }
    };
  
    return (
      /**
       * JSX representation of the FilterButton component.
       * 
       * @type {JSX.Element}
       */
      <div className='filter-final-button' onClick={clearFilters}>Reset</div>
    );
  };
  

export default FilterButton;