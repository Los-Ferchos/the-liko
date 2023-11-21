import React, { useState } from 'react';
import { Box, Checkbox, Collapse, FormControlLabel, FormGroup, List, ListItemButton, ListItemIcon, ListItemText, Slider } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

function valuetext(value) {
    return `${value}BOB`;
  }
  

const FilterItem = ({
    children="", 
    range=false, 
    icon: Icon, 
    subtext1='', 
    subtext2='',
    max=100
}) => {

    const [isOpen, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!isOpen);
      };

      const [first, setFirst] = useState(false);
      const [second, setSecond] = useState(false);

      const [value1, setValue1] = useState([20, 37]);
      const minDistance = 0;

      const handleChange1 = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
          return;
        }
    
        if (activeThumb === 0) {
          setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
        } else {
          setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
        }
      };

      const getFilterSlider = () => {
        <Box sx={{ display:'flex', paddingLeft:25}}>
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

                    </Box>
      }

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
                {
                    range ? 
                    <Box sx={{ display:'flex', justifyContent:'center', alignItems:'center', marginInline:'auto', marginTop:'1rem', width:'80%' }}>
                        <Slider 
                            getAriaLabel={() => 'Minimum distance'}
                            value={value1}
                            onChange={handleChange1}
                            valueLabelDisplay="auto"
                            getAriaValueText={valuetext}
                            disableSwap
                            size='small'
                            step={0.11}
                            max={max}
                        />
                    </Box>
                    :
                   getFilterSlider()
                
                }
            </Collapse>
    
        </>
    );
};

export default FilterItem;