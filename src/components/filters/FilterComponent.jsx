import React, { useEffect, useState } from 'react';
import { FaFilter } from "react-icons/fa";
import { Box, Drawer, List, ListSubheader } from '@mui/material';
import '../../assets/styles/filter.css';
import FilterList from './FilterList';
import FilterButton from '../buttons/FilterButton';
import { useDispatch } from 'react-redux';
import { setSelected } from '../../store/sortSlice';
import { useAppSelector } from '../hooks/store';
import ClearIcon from '@mui/icons-material/Clear';

/**
 * React Component for handling sorting and filtering functionality.
 * @component
 */
const FilterComponent = () => {
    // State to manage the visibility of the filter drawer
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    // Redux selector to check if filter has been sent
    const isFilterSent = useAppSelector((state) => state.sort.send);

    // Redux dispatch function
    const dispatch = useDispatch();

    /**
     * Toggles the filter drawer's visibility.
     * If the drawer is being opened, it also dispatches an action to set selected to false.
     */
    const toggleDrawer = () => {
        setDrawerOpen(!isDrawerOpen);
        if (!isDrawerOpen) {
            dispatch(setSelected(false))
        }
    };

    /**
     * Closes the filter drawer and dispatches an action to set selected to false.
     */
    const closeFilterBar = () => {
        setDrawerOpen(false)
        dispatch(setSelected(false))
    }

    // Effect hook to close the filter drawer when the filter is sent
    useEffect(() => {
        closeFilterBar();
    }, [isFilterSent])

    /**
     * Renders the filter drawer's list.
     * @param {string} anchor - The anchor position of the drawer.
     * @returns {JSX.Element} - The JSX element representing the filter drawer's list.
     */
    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 270, display: 'flex', flexDirection: 'column' }}
            role="presentation"
        >
            <List
                sx={{ width: '100%', maxWidth: 260, bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader sx={{ zIndex: '2', display: 'flex', paddingBlock: '.5rem' }}>
                        <ClearIcon sx={{ marginLeft: '.2rem', marginTop: '.2rem', cursor: 'pointer', zIndex: '2' }} onClick={closeFilterBar} />
                    </ListSubheader>
                }
            />
            <FilterList />
        </Box>
    );

    // Render the FilterComponent JSX
    return (
        <div className='filterOrderContainer'>
            <div className='icon-cont' onClick={toggleDrawer}>
                <p>
                    Sort/Filter
                </p>
                <span></span><span></span><span></span><span></span>
                <FaFilter />
            </div>

            <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer} sx={{
                '& .MuiDrawer-paper': {
                    borderTopLeftRadius: '30px'
                },
            }}>

                {list("right")}

                <FilterButton />
            </Drawer>
        </div>
    );
};

export default FilterComponent;
