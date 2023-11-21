import React from 'react';
import { FaSortAmountDown, FaFilter } from "react-icons/fa";
import '../../assets/styles/filter.css'

const FilterComponent = () => {
    return (
        <div className='filterOrderContainer'>
            <div className='icon-cont'>
                <p>
                Sort
                </p>
                <span></span><span></span><span></span><span></span>
                <FaSortAmountDown/>
                </div>
            <div className='icon-cont'>
                 <p>
                Filter
                </p>
                <span></span><span></span><span></span><span></span>
                <FaFilter/>
                </div>
        </div>
    );
};

export default FilterComponent;