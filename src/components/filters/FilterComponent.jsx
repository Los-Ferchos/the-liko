import React, { useState } from 'react';
import { FaSortAmountDown, FaFilter } from "react-icons/fa";
import { Box, Drawer } from '@mui/material';
import '../../assets/styles/filter.css';
import FilterList from './FilterList';

const FilterComponent = () => {
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        event.preventDefault;
        if (
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setDrawerOpen(open ? true : false);
    };


    const list = (anchor) => (
        <Box
          sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 270, display:'flex', flexDirection: 'column'  }}
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
            <FilterList/>
        </Box>
      );
    return (
        <div className='filterOrderContainer'>
            <div className='icon-cont' onClick={toggleDrawer(true)}>
                <p>
                    Sort
                </p>
                <span></span><span></span><span></span><span></span>
                <FaSortAmountDown />
            </div>
            <div className='icon-cont' onClick={toggleDrawer(true)}>
                <p>
                    Filter
                </p>
                <span></span><span></span><span></span><span></span>
                <FaFilter />
            </div>

            <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}  sx={{
                    '& .MuiDrawer-paper': {
                    borderTopLeftRadius: '30px', // Adjust the border radius as needed
                    },
                }}>
                <div
                    role="presentation"
                    onKeyDown={toggleDrawer(false)}
                >
                    {list("right")}
                    
                </div>
            </Drawer>
        </div>
    );
};

export default FilterComponent;
