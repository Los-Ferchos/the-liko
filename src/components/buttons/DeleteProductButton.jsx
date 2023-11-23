import React from 'react'
import { IconButton, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useGlobalCart } from '../contexts/CartContext';
import { useState } from 'react';
import { BsCart3, BsCartCheckFill } from 'react-icons/bs';
import { MdShoppingCartCheckout } from 'react-icons/md';
import { FaRegTrashAlt } from "react-icons/fa";

function DeleteProductButton() {
    return (
        <IconButton
            variant="outlined"
            color="primary"
        >
            <FaRegTrashAlt />
        </IconButton>
    )
}

export default DeleteProductButton