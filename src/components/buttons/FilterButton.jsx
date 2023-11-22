import React from 'react';
import '../../assets/styles/filter.css'
import { useDispatch } from 'react-redux';
import { sendOrders } from '../../store/sortSlice';

const FilterButton = () => {

    const dispatch = useDispatch();
    const sendOrdersRedux = async () => {
        try {
            dispatch(sendOrders());
        } catch (error) {
            console.log(error)
        }
    }

    return (
                <div className='filter-final-button' onClick={sendOrdersRedux}>send</div>
    );
};

export default FilterButton;