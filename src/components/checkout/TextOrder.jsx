import React from 'react';
import { Grid, Typography } from '@mui/material';

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