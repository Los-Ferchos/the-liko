import { useState, useEffect } from 'react';
import { Typography, Grid, IconButton } from '@mui/material';
import LazyImage from '../images/LazyImage';
import bottleLoaderImg from '../../assets/images/bottle-loader.png';
import { FaPlus, FaMinus, FaRegTrashAlt } from "react-icons/fa";
import { useCart } from '../hooks/useCart';

function CartProduct({product}) {
    const cart = useCart();

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
                                if(product.quantity > 1)
                                    cart.updateQuantity(product.productInfo._id, (product.quantity - 1));
                            }}>
                                <FaMinus size={20} />
                            </IconButton>
                            <Typography variant="subtitle1">
                                {product.quantity}
                            </Typography>
                            <IconButton onClick={() => {
                                cart.updateQuantity(product.productInfo._id, product.quantity + 1);
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
                        <IconButton color='primary'>
                            <FaRegTrashAlt />
                        </IconButton>
                    </div>
                </Grid>

            </Grid>
        </div>
    )
}

export default CartProduct