import React, {useState} from 'react'
import { Typography, IconButton, Dialog, DialogTitle, DialogActions, Button } from '@mui/material';
import { FaPlus, FaMinus } from "react-icons/fa";
import { useGlobalCart } from '../contexts/CartContext';
import CartActionsManager from '../cart/CartActionsManager';

const QuantityButtons = ({ quantity, setQuantity, product }) => {
    const cart = useGlobalCart()
    const cartActions = CartActionsManager();
    const [dialog, setDialog] = useState(false);

    const updateQuantity = (newQuantity) => {
        if (cart.userLogged)
            cartActions.updateQuantity(cart.userLogged.userId, product.productInfo._id, newQuantity)
        cart.updateQuantity(product.productInfo._id, newQuantity)
    }

    return (
        <>
            <Dialog
                open={dialog}
                onClose={() => setDialog(false)}
                aria-labelledby="dialog-title"
            >
                <DialogTitle id="dialog-title">
                    {"No more products in stock"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={() => setDialog(false)}>Ok</Button>
                </DialogActions>
            </Dialog>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <IconButton onClick={() => {
                    if (product.quantity > 1) {
                        updateQuantity(product.quantity - 1);
                        setQuantity(quantity - 1);
                    }
                }}>
                    <FaMinus size={20} />
                </IconButton>
                <Typography variant="subtitle1">
                    {product.quantity}
                </Typography>
                <IconButton onClick={() => {
                    if (product.quantity < product.productInfo.quantity) {
                        updateQuantity(product.quantity + 1);
                        setQuantity(quantity + 1);
                    } else {
                        setDialog(true);
                    }
                }}>
                    <FaPlus size={20} />
                </IconButton>
            </div>
        </>
    )
}

export default QuantityButtons