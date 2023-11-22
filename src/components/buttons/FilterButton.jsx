import React from 'react';
import '../../assets/styles/filter.css'
import { Link } from 'react-router-dom';

const FilterButton = () => {
    return (

            <Link to="/"><div className='filter-final-button'>send</div></Link>
    );
};

export default FilterButton;