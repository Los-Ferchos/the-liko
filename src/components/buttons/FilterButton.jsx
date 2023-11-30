import React from 'react';
import '../../assets/styles/filter.css'
import { useDispatch } from 'react-redux';
import { clearAll, sendOrders } from '../../store/sortSlice';

const FilterButton = () => {

    const dispatch = useDispatch();
    const clearFilters = async () => {
        try {
            dispatch(clearAll());
            dispatch(sendOrders());
        } catch (error) {
            console.log(error)
        }
    }

    return (
                <div className='filter-final-button' onClick={clearFilters}>Reset</div>
    );
};

export default FilterButton;