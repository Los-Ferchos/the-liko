import React, { useState } from 'react';
import { Box, Checkbox, Collapse, FormControlLabel, FormGroup, List, ListItemButton, ListItemIcon, ListItemText, Slider } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useAppSelector } from '../hooks/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addFilter, removeFilter, setSelected, setSortSelected } from '../../store/sortSlice';
import '../../assets/styles/filter.css';


const FilterItem = ({
    children="", 
    range=false, 
    icon: Icon, 
    subtext1='', 
    subtext2='',
    max=100,
    sortWay=0
}) => {


    const isSortSelected = useAppSelector((state) => state.sort.isSelected);
    const isFilterRequest = useAppSelector((state) => state.sort.send);
    const dispatch = useDispatch();
    const [isOpen, setOpen] = useState(false);

    const [first, setFirst] = useState(false);
    const [second, setSecond] = useState(false);
    const [filterCheck, setFilterCheck] = useState(false);
    const [valuesArray, setValuesArray] = useState([0, max]);


    const handleClick = () => {
    setOpen(!isOpen);
    };


    const handleCheckboxFirst = (event) => {
    dispatch(setSelected(event.target.checked))
        if (!isSortSelected || second || first) {
            setSecond(false)
            setFirst(event.target.checked)
            dispatch(setSortSelected([`&sort=-${sortWay}`]))
        } 
    }

    const handleCheckboxSecond = (event) => {
    dispatch(setSelected(event.target.checked))
        if (!isSortSelected || first || second) {
            setFirst(false)
            setSecond(event.target.checked)
            dispatch(setSortSelected([`&sort=${sortWay}`]))
        }
    }

    const handleCheckboxFilter = (event) => {
        setFilterCheck(event.target.checked)
        if (event.target.checked) {
            dispatch(addFilter(`${sortWay}_${valuesArray[0]}_${valuesArray[1]}`))
        } else {
            dispatch(removeFilter(`${sortWay}_${valuesArray[0]}_${valuesArray[1]}`))
        }
    }


    const [value1, setValue1] = useState([0, max]);
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
        setValuesArray(newValue);
    };

    const getSortWays = <> <Box sx={{ display:'flex', paddingLeft:25}}>
                    <FormGroup row={false}>
                    <FormControlLabel
                        name='sortBox'
                        sx={{ '& .MuiFormControlLabel-label': { fontSize: '.9rem' } }}
                        control={
                            <Checkbox
                            sx={{padding: 1.5,
                                '& .MuiSvgIcon-root': {width: 20,height: 20}}}
                            checked={first}
                            onChange={handleCheckboxFirst}
                            />
                    } label={subtext1}
                    />
                    <FormControlLabel
                        name='sortBox'
                        sx={{ '& .MuiFormControlLabel-label': { fontSize: '.9rem' } }}
                        control={
                            <Checkbox
                            sx={{
                                padding: 1.5, 
                                '& .MuiSvgIcon-root': {width: 20,height: 20}}}
                            checked={second}
                            onChange={handleCheckboxSecond}
                            />
                    } label={subtext2}
                    />
                </FormGroup>

                </Box>
    </>

      const getFiltersCheckbox = 
            <>
                <Box sx={{ display:'flex', flexDirection:'row'}}>
                    <FormGroup row>
                    <FormControlLabel
                        name='filterBox'
                        sx={{ '& .MuiFormControlLabel-label': { fontSize: '.9rem' } }}
                        control={
                            <Checkbox
                            sx={{padding: 1.5,
                                '& .MuiSvgIcon-root': {width: 20,height: 20}}}
                            checked={filterCheck}
                            onChange={handleCheckboxFilter}
                            />
                    } label={"Add"}
                    />
                </FormGroup>

                </Box>
            
            </>
    return (
        <>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                <Icon />
                </ListItemIcon>
                <ListItemText sx={{ '& .MuiListItemText-primary': { fontWeight:'501', color:'rgb(90, 90, 89)', fontSize:'.95rem' } }} primary={children} />
                {isOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                {
                    range ? 
                    <Box sx={{ display:'flex', justifyContent:'center',
                    flexDirection:'column', alignItems:'center', marginInline:'auto', marginTop:'1rem', width:'80%'}}>
                        <Slider
                        disabled={ filterCheck ? true: false}
                        style={{color:'red'}}
                            getAriaLabel={() => 'Minimum distance'}
                            value={value1}
                            onChange={handleChange1}
                            valueLabelDisplay={ filterCheck ? "on": "auto"}
                            disableSwap
                            size='small'
                            step={0.11}
                            max={max}
                        />
                        {getFiltersCheckbox}
                    </Box>
                    :
                   getSortWays
                
                }
            </Collapse>
    
        </>
    );
};

export default FilterItem;