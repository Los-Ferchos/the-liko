import { useState } from 'react';
import { Typography, Grid, IconButton } from '@mui/material';
import LazyImage from '../images/LazyImage';
import bottleLoaderImg from '../../assets/images/bottle-loader.png';
import { FaPlus, FaMinus, FaRegTrashAlt } from "react-icons/fa";
import CartActionsManager from './CartActionsManager';

/**
 * This the cart product component to render the product details when it is in the cart.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {Object} cart - The current cart in the localstorage with the cart items.
 * @param {Object} product - The specific item in the shopping cart.
 * @returns {JSX.Element} Rendered CartProduct component.
 */
function CartProduct({cart, product}) {
    const [quantity, setQuantity] = useState(product.quantity)
    const cartActions = CartActionsManager();

    const updateQuantity = (newQuantity) => {
        if(cart.userLogged)
            cartActions.updateQuantity(cart.userLogged.userId, product.productInfo._id, newQuantity)
        cart.updateQuantity(product.productInfo._id, newQuantity)
    }

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
                        <Typography variant="h6" component="div">
                            {product.productInfo.name}
                        </Typography>
                    </div>
                </Grid>
                <Grid item width={"70%"} className="details">
                    <div >
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Typography variant="subtitle1">
                                {product.productInfo.price.currency} {product.productInfo.price.value}
                            </Typography>
                        </div>
                    </div>
                    <div >
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <IconButton onClick={() => {
                                if(quantity > 1) {
                                    updateQuantity(quantity-1);
                                    setQuantity(quantity-1);
                                }
                            }}>
                                <FaMinus size={20} />
                            </IconButton>
                            <Typography variant="subtitle1">
                                {product.quantity}
                            </Typography>
                            <IconButton onClick={() => {
                                updateQuantity(quantity+1);
                                setQuantity(quantity+1);
                            }}>
                                <FaPlus size={20} />
                            </IconButton>
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Typography variant="subtitle1">
                        {product.productInfo.price.currency} {(product.productInfo.price.value * product.quantity).toFixed(2)}
                        </Typography>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <IconButton color='primary' onClick={() => {
                            cart.removeProductFromCart(product.productInfo._id)
                            if(cart.userLogged)
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