import React, { useEffect, useState } from 'react';
import { FaSortAmountDown, FaFilter } from "react-icons/fa";
import { Box, Drawer, List, ListSubheader } from '@mui/material';
import '../../assets/styles/filter.css';
import FilterList from './FilterList';
import FilterButton from '../buttons/FilterButton';
import { useDispatch } from 'react-redux';
import { setSelected } from '../../store/sortSlice';
import { useAppSelector } from '../hooks/store';
import ClearIcon from '@mui/icons-material/Clear';


const FilterComponent = () => {
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const isFilterSent = useAppSelector((state) => state.sort.send);
    const dispatch = useDispatch();

    const toggleDrawer = () => {
        setDrawerOpen(!isDrawerOpen);
        if (!isDrawerOpen) {
            dispatch(setSelected(false))
        }
    };

    const closeFilterBar = () => {
        setDrawerOpen(false)
        dispatch(setSelected(false))
    }


    useEffect(() => {
        closeFilterBar();
    }, [isFilterSent])


    const list = (anchor) => (
        <Box
          sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 270, display:'flex', flexDirection: 'column'  }}
          role="presentation"

        >
        <List
            sx={{ width: '100%', maxWidth: 260, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader sx={{zIndex:'2', display:'flex', paddingBlock:'.5rem'}}>
                    <ClearIcon sx={{marginLeft:'.2rem', marginTop:'.2rem', cursor:'pointer', zIndex:'2'}} onClick={closeFilterBar}/>
                </ListSubheader>
                }
                    />
            <FilterList />
        </Box>
      );
    return (
        <div className='filterOrderContainer'>
            <div className='icon-cont' onClick={toggleDrawer}>
                <p>
                    Sort/Filter
                </p>
                <span></span><span></span><span></span><span></span>
                <FaFilter />
            </div>

            <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}  sx={{
                    '& .MuiDrawer-paper': {
                    borderTopLeftRadius: '30px'
                    },
                }}>

                    {list("right")}
                    
                <FilterButton/>
            </Drawer>
        </div>
    );
};

export default FilterComponent;
