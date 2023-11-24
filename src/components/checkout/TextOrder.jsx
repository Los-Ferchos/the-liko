import React from 'react';
import { Grid, Typography } from '@mui/material';

/**
 * A React component that displays two texts on opposite sides of the screen.
 *
 * @param {string} TitleLeft - The text to display on the left side of the screen.
 * @param {string} TitleRight - The text to display on the right side of the screen.
 *
 * @return {React.Component} A React component representing the text order.
 */
const TextOrder = ({TitleLeft='', TitleRight=''}) => {
     return (
        <Grid container spacing={2} alignItems="center">
        <Grid item xs={6}>
          <div className='text-order'>
            <Typography variant='h5'>{TitleLeft}</Typography>
          </div>
        </Grid>
        <Grid item xs={6} style={{ textAlign: 'right' }}>
          <div className='text-order'>
            <Typography variant='h5'>{TitleRight}</Typography>
          </div>
        </Grid>
        </Grid>
     )};
export default TextOrder;