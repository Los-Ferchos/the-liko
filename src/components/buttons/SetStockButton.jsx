import React, { useState } from 'react'
import { Button } from '@mui/material';
import { MdOutlineSaveAlt } from "react-icons/md";

const SetStockButton = ({ onClick }) => {
    
    return (
        <Button
        variant="outlined"
        color="warning"
        startIcon={<MdOutlineSaveAlt />}
        style={{width:"100%"}}
        onClick={onClick}
    >   
        Set Stock
         </Button>
    );
};

export default SetStockButton;