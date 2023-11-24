import React from 'react'
import { FaRegTrashAlt } from "react-icons/fa";
import { useState } from 'react';
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

/**
 * DeleteProductButton component display the delete product button, to delete a product
 * 
 * @param {Object} props - The properties of the component.
 * @returns {JSX.Element} - Rendered DeleteProductButton component.
 */
function DeleteProductButton() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [msg, setMsg] = useState("The action delete the product of the database permanently. This action is irreversible. ");

    const deleteProduct = async () => {
        setLoading(true)
        setError(true)
        setLoading(true)
    }

    return (
        <>
        <Dialog
            open={error}
            onClose={() => setError(false)}
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
                <Button onClick={() => setError(false)}>Cancel</Button>
                <Button onClick={() => { setError(false), deleteProduct }}>Continue</Button>
            </DialogActions>
        </Dialog>
        {
             (<Button
                variant="outlined"
                color="primary"
                startIcon={<FaRegTrashAlt />}
                style={{width:"48%"}}
                onClick={() => setError(true)}
            >
                Delete
            </Button>)
        }
    </>
    )
}

export default DeleteProductButton