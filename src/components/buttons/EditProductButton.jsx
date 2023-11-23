import React from 'react'
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useGlobalCart } from '../contexts/CartContext';
import { useState } from 'react';
import { BsCart3, BsCartCheckFill } from 'react-icons/bs';
import { MdShoppingCartCheckout } from 'react-icons/md';
import { FaRegEdit } from "react-icons/fa";

function EditProductButton() {
    return (
        <Button
            variant="outlined"
            color="success"
            startIcon={<FaRegEdit />}
            style={{width:"85%"}}
        >
            Edit Product
        </Button>
    )
}

export default EditProductButton