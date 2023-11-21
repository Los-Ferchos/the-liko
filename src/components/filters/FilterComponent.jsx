import React, { useState } from 'react';
import { FaSortAmountDown, FaFilter } from "react-icons/fa";
import { Box, Collapse, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import '../../assets/styles/filter.css';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import AbcIcon from '@mui/icons-material/Abc';


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

        setDrawerOpen(open);
    };

    const [isOpen, setOpen] = useState(true);

    const handleClick = () => {
      setOpen(!isOpen);
    };


    const list = (anchor) => (
        <Box
          sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250, display:'flex', flexDirection: 'column'  }}
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
         <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                Nested List Items
                </ListSubheader>
            }
        >
                <ListItemButton>
                    <ListItemIcon>
                    <AbcIcon />
                    </ListItemIcon>
                    <ListItemText primary="Alphabetical Order " />
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                    <FaFilter />
                    </ListItemIcon>
                    <ListItemText primary="Price " />
                </ListItemButton>
                <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                    <FaFilter />
                    </ListItemIcon>
                    <ListItemText primary="Inbox" />
                    {isOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                        <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Starred" />
                    </ListItemButton>
                    </List>
                </Collapse>
                </List>
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

            <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
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
