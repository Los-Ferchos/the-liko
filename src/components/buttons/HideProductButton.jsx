import React, { useEffect } from 'react'
import { useState } from 'react';
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa';
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { API_URL_LINK } from '../../utils/constants';

/**
 * HideProductButton component display the hide product button, to hide a product
 * 
 * @param {Object} props - The properties of the component.
 * @returns {JSX.Element} - Rendered HideProductButton component.
 */
function HideProductButton({ product }) {
    const [loading, setLoading] = useState(false);
    const [dialog, setDialog] = useState(false);
    const [dialogActive, setDialogActive] = useState(false);
    const [msg, setMsg] = useState("The action hide the product selected from the users, it means that the product will not be available for the users. ");
    const [msgActive, setMsgActive] = useState("The action show the product selected from the users, it means that the product will be available for the users. ");
    const [isAvailable, setAvailable] = useState(true);

    useEffect(() => {
        if (!product) return;
        setAvailable(product.availability)
    }, [product])

    const hideProduct = async () => {
        setLoading(true);
        setDialog(false);
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ availability: false }),
        };
        await fetch(`${API_URL_LINK}/products/${product._id}`, options);
        setAvailable(false)
        setLoading(false);
    }

    const showProduct = async () => {
        setDialogActive(false)
        setAvailable(true);
    }

    return (
        <>
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
                        <Button onClick={() => { setDialog(false), hideProduct() }}>Continue</Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={dialogActive}
                    onClose={() => setDialogActive(false)}
                    aria-labelledby="dialog-title"
                    aria-describedby="dialog-description"
                >
                    <DialogTitle id="dialog-title">
                        {"Are you sure to continue?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="dialog-description">
                            {msgActive}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDialogActive(false)}>Cancel</Button>
                        <Button onClick={() => showProduct()}>Continue</Button>
                    </DialogActions>
                </Dialog>
            </>
            {
                loading ? (
                    <Button
                        variant="outlined"
                        color="primary"
                        disabled
                        style={{ borderColor: '#F00', color: "#F00", width: "48%" }}
                    >
                        Hiding &nbsp;&nbsp;<CircularProgress size={16} />
                    </Button>
                ) : isAvailable ? (
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => setDialog(true)}
                        startIcon={<FaRegEye />}
                        style={{ borderColor: '#555', color: "#555", width: "48%" }}
                    >
                        Hide
                    </Button>
                ) : (

                    <Button
                        variant="outlined"
                        style={{ borderColor: '#555', color: "#555", width: "48%" }}
                        startIcon={<FaRegEyeSlash />}
                        onClick={() => setDialogActive(true)}
                    >
                        Hidden
                    </Button>
                )
            }
        </>
    )
}

export default HideProductButton