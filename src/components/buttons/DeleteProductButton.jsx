import React from 'react'
import { FaRegTrashAlt } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { API_URL_LINK } from '../../utils/constants';

/**
 * DeleteProductButton component display the delete product button, to delete a product
 * 
 * @param {Object} props - The properties of the component.
 * @returns {JSX.Element} - Rendered DeleteProductButton component.
 */
function DeleteProductButton({product}) {
    const [loading, setLoading] = useState(false);
    const [dialog, setDialog] = useState(false);
    const [msg, setMsg] = useState("The action delete the product of the database permanently. This action is irreversible. ");


    /**
     * Method to delete the porduct.
     * 
     * This method change the attribute "deleted" to true, hiding the product from the user
     * and the administrator.
     */
    const deleteProduct = async () => {
        setLoading(true);
        setDialog(false);
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ deleted: true }),
        };
        await fetch(`${API_URL_LINK}/products/${product._id}`, options);
        setLoading(false);
        window.location.reload();
    }

    return (
        <>
        <Dialog
            open={dialog}
            onClose={() => setDialog(false)}
            aria-labelledby="dialog-title"
            aria-describedby="dialog-description"
        >
            <DialogTitle id="dialog-title">
                {"Are you sure to continue?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="dialog-description">
                    {msg}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setDialog(false)}>Cancel</Button>
                <Button onClick={() => deleteProduct()}>Continue</Button>
            </DialogActions>
        </Dialog>
        {
             (<Button
                variant="outlined"
                color="primary"
                startIcon={<FaRegTrashAlt />}
                style={{width:"48%"}}
                onClick={() => setDialog(true)}
            >
                Delete
            </Button>)
        }
    </>
    )
}

export default DeleteProductButton