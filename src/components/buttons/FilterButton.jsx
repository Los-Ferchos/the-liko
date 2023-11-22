import React from 'react';
import '../../assets/styles/filter.css'
import { useDispatch } from 'react-redux';
import { sendOrders, setSortSelected } from '../../store/sortSlice';

const FilterButton = () => {

    const dispatch = useDispatch();
    const sendOrdersRedux = async () => {
        try {
            dispatch(setSortSelected([`&sort=1`]))
            dispatch(sendOrders(true));
        } catch (error) {
            console.log(error)
        }
    }

    return (
                <div className='filter-final-button' onClick={sendOrdersRedux}>send</div>
    );
};

export default FilterButton;