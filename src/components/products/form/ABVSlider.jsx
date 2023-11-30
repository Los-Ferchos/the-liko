import React from 'react';
import { Slider, Typography, Box } from '@mui/material';

const getInteger = (val) => {
  if (val === "0" || val === 0) {
    return 0;
  }
  if (val == null) {
    return 0;
  }
  return parseInt(val);
}

/**
 * ABVSlider component for selecting Alcohol By Volume.
 * @component
 * @param {Object} props - The component props.
 * @param {number} props.value - The current value of the slider.
 * @param {function} props.handleChange - The callback function to handle slider value changes.
 * @returns {JSX.Element} - The rendered ABVSlider component.
 */
const AbvSlider = ({ value, handleChange }) => (
  <Box marginTop={12} paddingRight={3} paddingLeft={3}>
    <Typography gutterBottom textAlign={"left"} variant='subtitle1' color={"#555"}>ABV (Alcohol By Volume) *</Typography>
    <Slider
      value={getInteger(value)}
      name='abv'
      onChange={handleChange}
      valueLabelDisplay="auto"
      valueLabelFormat={(val) => `${val}%`}
      step={1}
      min={0}
      max={100}
    />
    <Typography textAlign={"left"} color="grey">Selected ABV: {value}%</Typography>
  </Box>
);

export default AbvSlider;
