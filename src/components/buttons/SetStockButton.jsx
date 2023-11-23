import React from 'react'
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useGlobalCart } from '../contexts/CartContext';
import { useState } from 'react';
import { BsCart3, BsCartCheckFill } from 'react-icons/bs';
import { MdShoppingCartCheckout } from 'react-icons/md';
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