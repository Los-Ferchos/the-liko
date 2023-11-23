import React from 'react'
import { Button } from '@mui/material';
import { MdOutlineSaveAlt } from "react-icons/md";

function SetStockButton() {
    return (
        <Button
            variant="outlined"
            color="warning"
            startIcon={<MdOutlineSaveAlt />}
            style={{width:"100%"}}
        >
            Set Stock
        </Button>
    )
}

export default SetStockButton