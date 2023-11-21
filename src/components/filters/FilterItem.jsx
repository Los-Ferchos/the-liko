import React, { useState } from 'react';
import { Checkbox, Collapse, FormControlLabel, FormGroup, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';


const FilterItem = ({children="", range=false, icon: Icon, subtext1='', subtext2=''}) => {

    const [isOpen, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!isOpen);
      };

      const [first, setFirst] = useState(false);
      const [second, setSecond] = useState(false);

    return (
        <>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                <Icon />
                </ListItemIcon>
                <ListItemText primary={children} />
                {isOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding dense={true}>
                    <ListItemButton sx={{ paddingLeft: 20 }}>
                    <FormGroup row={false}>
                        <FormControlLabel
                        control={
                            <Checkbox
                            sx={{
                                padding: 2, 
                                '& .MuiSvgIcon-root': {
                                  width: 20,
                                  height: 20,
                                },
                              }}
                            checked={first}
                            onChange={(event) => setFirst(event.target.checked)}
                            />
                        }
                        label={subtext1}
                        />
                        <FormControlLabel
                        control={
                            <Checkbox
                            sx={{
                                padding: 2, 
                                '& .MuiSvgIcon-root': {
                                  width: 20,
                                  height: 20,
                                },
                              }}
                            checked={second}
                            onChange={(event) => setSecond(event.target.checked)}
                            />
                        }
                        label={subtext2}
                        />
                    </FormGroup>
                    </ListItemButton>
                </List>
            </Collapse>
    
        </>
    );
};

export default FilterItem;