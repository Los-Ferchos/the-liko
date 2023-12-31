import React, { useState, useEffect } from 'react';
import { Box, Checkbox, Collapse, FormControlLabel, FormGroup, ListItemButton, ListItemIcon, ListItemText, Slider } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useAppSelector } from '../hooks/store';
import { useDispatch } from 'react-redux';
import { addFilter, removeFilter, setSelected, setSortSelected, removeFilterFromIndex, setMaxPriceNumber } from '../../store/sortSlice';
import '../../assets/styles/filter.css';
import { API_URL_LINK } from '../../utils/constants';
import CircularProgress from '@mui/material/CircularProgress';

/**
 * React Component representing a filter item, used in the filter drawer.
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {string} [props.children=""] - The text content of the filter item.
 * @param {boolean} [props.range=false] - Indicates whether the filter item is a range slider.
 * @param {React.Component} [props.icon] - The icon component for the filter item.
 * @param {string} [props.subtext1=''] - The label for the first sort option.
 * @param {string} [props.subtext2=''] - The label for the second sort option.
 * @param {number} [props.max=100] - The maximum value for the range slider.
 * @param {number} [props.sortWay=0] - The sort option associated with the filter item.
 * @returns {JSX.Element} - The JSX element representing the filter item.
 */
const FilterItem = ({
    children = "",
    range = false,
    icon: Icon,
    subtext1 = '',
    subtext2 = '',
    max = 100,
    sliderStep = 1,
    sortWay = 0
}) => {
    // Redux selectors
    const isSortSelected = useAppSelector((state) => state.sort.isSelected);
    const filterQueryArray = useAppSelector((state) => state.sort.filtersSelected);
    const maxStoragePriceNumber = useAppSelector((state) => state.sort.maxPriceNumber);
    const currencyCode = useAppSelector((state) => state.location.currency);
    const dispatch = useDispatch();

    // State variables
    const [isOpen, setOpen] = useState(false);
    const [first, setFirst] = useState(false);
    const [second, setSecond] = useState(false);
    const [filterCheck, setFilterCheck] = useState(false);
    const [valuesArray, setValuesArray] = useState([0, max]);
    const [maxPrice, setMaximumPrice] = useState(max)
    const [value1, setValue1] = useState([0, maxPrice]);
    const [loading, setLoading] = useState(false);

    /**
     * Handles the click event for opening/closing the filter item.
     */
    const handleClick = () => {
        setOpen(!isOpen);
    };


    useEffect(() => {
        if (maxStoragePriceNumber < 1) {
            if (sortWay === 1 && range) {
                const fetchProducts = async () => {
                    try {
                      setLoading(true);
                      const response = await fetch(`${API_URL_LINK}/products?newCurrency=${currencyCode}&sort=-2`);
                      if (response.ok) {
                        const data = await response.json();
                        const maxProductPrice = data.products[0].price.value;
                        var intMaxPart = Math.ceil(maxProductPrice / 10) * 10;
                        setMaximumPrice(intMaxPart);
                        dispatch(setMaxPriceNumber(intMaxPart))
                        setValue1([0, maxPrice]);
                      } setLoading(false);
                    } catch (error) {
                      console.log(error)
                    }
                  };
                
                  fetchProducts();
            }
        } else {
            setMaximumPrice(maxStoragePriceNumber);
        }
    }, []) 


    /**
     * Handles the checkbox change event for the first sort option.
     * @param {Event} event - The change event.
     */
    const handleCheckboxFirst = (event) => {
        dispatch(setSelected(event.target.checked));
        if (!isSortSelected || second || first) {
            setSecond(false);
            setFirst(event.target.checked);
            dispatch(setSortSelected([`&sort=-${sortWay}`]));
        }
    };

    /**
     * Handles the checkbox change event for the second sort option.
     * @param {Event} event - The change event.
     */
    const handleCheckboxSecond = (event) => {
        dispatch(setSelected(event.target.checked));
        if (!isSortSelected || first || second) {
            setFirst(false);
            setSecond(event.target.checked);
            dispatch(setSortSelected([`&sort=${sortWay}`]));
        }
    };

    const isNotFilterOn = () => {
        for (let i = 0; i < filterQueryArray.length; i++) {
            if (filterQueryArray[i].startsWith(sortWay.toString())) {
                dispatch(removeFilterFromIndex(i))
            };
        }
    }

    /**
     * Handles the checkbox change event for the filter option.
     * @param {Event} event - The change event.
     */
    const handleCheckboxFilter = (event) => {
        setFilterCheck(event.target.checked);
                 if (event.target.checked) {
                    isNotFilterOn();
                    dispatch(
                    addFilter(`${sortWay}_${valuesArray[0]}_${valuesArray[1]}`)
                );
            }
            else {
                dispatch(
                    removeFilter(`${sortWay}_${valuesArray[0]}_${valuesArray[1]}`)
                    );
            }
    };

    /**
     * Handles the change event for the range slider.
     * @param {Event} event - The change event.
     * @param {Array<number>} newValue - The new values for the range slider.
     * @param {number} activeThumb - The index of the active thumb.
     */
    const handleChange1 = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) return;

        if (activeThumb === 0) setValue1([Math.min(newValue[0], value1[1] - 0), value1[1]]);
        else {
         setValue1([value1[0], Math.max(newValue[1], value1[0] + 0)]);
        }   
        
        setValuesArray(newValue);
    };

    /**
     * JSX element representing the sort options.
     */
    const getSortWays = (
        <Box sx={{ display: 'flex', paddingLeft: 25 }}>
            <FormGroup row={false}>
                <FormControlLabel
                    name='sortBox'
                    sx={{ '& .MuiFormControlLabel-label': { 
                        fontSize: '.9rem' } }}
                    control={
                        <Checkbox
                            sx={{
                                padding: 1.5,
                                '& .MuiSvgIcon-root': { 
                                    width: 20,
                                     height: 20 }
                            }}
                            checked={first}
                            onChange={handleCheckboxFirst}
                        />
                    } label={subtext1}
                />
                <FormControlLabel
                    name='sortBox'
                    sx={{ '& .MuiFormControlLabel-label': { 
                        fontSize: '.9rem' } }}
                    control={
                        <Checkbox
                            sx={{
                                padding: 1.5,
                                '& .MuiSvgIcon-root': {
                                     width: 20,
                                     height: 20 }
                            }}
                            checked={second}
                            onChange={handleCheckboxSecond}
                        />
                    } label={subtext2}
                />
            </FormGroup>
        </Box>
    );

    /**
     * JSX element representing the filter checkbox.
     */
    const getFiltersCheckbox = (
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <FormGroup row>
                <FormControlLabel
                    name='filterBox'
                    sx={{ '& .MuiFormControlLabel-label': { fontSize: '.9rem' } }}
                    control={
                        <Checkbox
                            sx={{
                                padding: 1.5,
                                '& .MuiSvgIcon-root': { width: 20, height: 20 }
                            }}
                            checked={filterCheck}
                            onChange={handleCheckboxFilter}
                        />
                    } label={"Add"}
                />
            </FormGroup>
        </Box>
    );

    // JSX representation of the FilterItem
    return (
        <>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <Icon />
                </ListItemIcon>
                <ListItemText sx={{ '& .MuiListItemText-primary': { 
                    fontWeight: '501',
                     color: 'rgb(90, 90, 89)', 
                     fontSize: '.95rem' } }} 
                     primary={children} />

                {loading ? <CircularProgress size={20} /> : isOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                {range ?
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        marginInline: 'auto', 
                        marginTop: '1rem', 
                        width: '85%'
                    }}>
                        <Slider
                            disabled={filterCheck ? true : false}
                            style={{ color: 'red' }}
                            getAriaLabel={() => 'Minimum distance'}
                            value={value1}
                            onChange={handleChange1}
                            valueLabelDisplay={filterCheck ? "on" : "auto"}
                            disableSwap
                            size='small'
                            step={sliderStep}
                            max={maxPrice}
                            
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