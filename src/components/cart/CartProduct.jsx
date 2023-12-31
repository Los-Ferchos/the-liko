import { useState } from 'react';
import { Typography, Grid, IconButton, Dialog, DialogActions, DialogTitle, Button } from '@mui/material';
import LazyImage from '../images/LazyImage';
import bottleLoaderImg from '../../assets/images/bottle-loader.png';
import { FaRegTrashAlt } from "react-icons/fa";
import CartActionsManager from './CartActionsManager';
import QuantityButtons from '../buttons/QuantityButtons';
import { useGlobalCart } from '../contexts/CartContext';

/**
 * This the cart product component to render the product details when it is in the cart.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {Object} product - The specific item in the shopping cart.
 * @returns {JSX.Element} Rendered CartProduct component.
 */
function CartProduct({ product }) {
    const [quantity, setQuantity] = useState(product.quantity)
    const cartActions = CartActionsManager();
    const cart = useGlobalCart();

    return (
        <div style={{ padding: 15 }}>
            <Grid container style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                <Grid item width={"30%"} alignContent={"center"}>
                    <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                        <LazyImage
                            src={product.productInfo.imgUrl}
                            placeholderSrc={bottleLoaderImg}
                            style={{ width: 100, height: 100 }}
                        />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                        <Typography variant="h6" component="div" textAlign={'center'}>
                            {product.productInfo.name}
                        </Typography>
                    </div>
                </Grid>
                <Grid item width={"70%"} className="details">
                    <div >
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Typography variant="subtitle1" display={"flex"} alignItems={"flex-end"}>
                                {product.productInfo.price.currency}&nbsp;
                                {
                                    Number.isInteger(product.productInfo.price.value) ?
                                        product.productInfo.price.value :
                                        parseFloat(product.productInfo.price.value).toFixed(2)
                                }
                            </Typography>
                        </div>
                    </div>
                    <div >
                        <QuantityButtons quantity={quantity} setQuantity={setQuantity} product={product}></QuantityButtons>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Typography variant="subtitle1" display={"flex"} alignItems={"flex-end"}>
                            {product.productInfo.price.currency}&nbsp;
                            {
                                Number.isInteger(product.productInfo.price.value * product.quantity) ?
                                    product.productInfo.price.value * product.quantity :
                                    parseFloat(product.productInfo.price.value * product.quantity).toFixed(2)
                            }
                        </Typography>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <IconButton color='primary' onClick={() => {
                            cart.removeProductFromCart(product.productInfo._id)
                            if (cart.userLogged)
                                cartActions.removeItem(cart.userLogged.userId, product.productInfo._id)
                        }}>
                            <FaRegTrashAlt />
                        </IconButton>
                    </div>
                </Grid>

            </Grid>
        </div>
    )
}

export default CartProduct