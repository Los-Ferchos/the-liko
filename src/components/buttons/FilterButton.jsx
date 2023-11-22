import React from 'react';
import '../../assets/styles/filter.css'
import { Link } from 'react-router-dom';
import { useAppSelector } from '../hooks/store';
import { useDispatch } from 'react-redux';
import { setSortSelected } from '../../store/sortSlice';

const FilterButton = () => {

    const actualApi = useAppSelector((state) => state.sort.actualApiLink);

    const dispatch = useDispatch();

    const sendOrders = async () => {
        try {
            await dispatch(setSortSelected([`&sort=1`]));
        } catch (error) {
            console.log(error)
        }
    }

    return (
                <div className='filter-final-button' onClick={sendOrders}>send</div>
    );
};

export default FilterButton;