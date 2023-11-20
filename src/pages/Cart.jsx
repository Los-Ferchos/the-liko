import Header from '../components/header/Header'
import { Container, Typography, Grid, Button, Card } from '@mui/material'
import NavigationText from '../components/navText/NavigationText'
import CartProduct from '../components/cart/CartProduct'
import '../assets/styles/cart.css'
import { useState, useEffect } from 'react';
import { API_URL_LINK } from '../utils/constants'
import { useNavigate } from 'react-router-dom';
import { useCart } from '../components/hooks/useCart'

function Cart() {
    const [products, setProducts] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const navigate = useNavigate();
    const cart = useCart();

    return (
        <Container component={"section"} style={{ position: "relative" }}>
            <Header />
            <NavigationText
                inactivePath={[{ title: "Home", href: "/" }]}
                activePath='Cart'
            />
            <Typography variant='h4' color='primary' component='h1' marginTop={8} marginBottom={8}>Shopping Cart</Typography>
            <Grid container spacing={30}>
                <Grid item className='products'>
                    <div style={{ padding: 20 }}>
                            {cart.cartItems.map((product, index) => (
                                <CartProduct
                                    product={product}
                                    key={index}
                                />
                            ))}
                        <Button variant='outlined' style={{marginTop:10}}onClick={() => {
                                navigate("/products")
                            }}>Continue Shopping</Button>
                    </div>
                </Grid>
                <Grid item className='order-summary' style={{ position: "sticky", top: "20px" }}>
                    <Card style={{ padding: 20 }}>
                        <Grid item>
                            <Typography variant='h5' color='black' component='h1' style={{ fontWeight: "bold" }} marginBottom={6}>Order Summary</Typography>
                        </Grid>
                        <Grid item style={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant='h6' color='black' component='h1'>Subtotal</Typography>
                            <Typography variant='h6' color='black' component='h1'>{subtotal}</Typography>
                        </Grid>
                        <Grid item style={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant='h6' color='black' component='h1'>Tax</Typography>
                            <Typography variant='h6' color='black' component='h1'>0%</Typography>
                        </Grid>
                        <Grid item style={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant='h6' color='black' component='h1'>Total</Typography>
                            <Typography variant='h6' color='black' component='h1'>{subtotal}</Typography>
                        </Grid>
                        <Button variant='outlined' style={{marginTop:10, alignContent:"center"}}
                            onClick={() => {
                                navigate("/products")
                            }}>Checkout</Button>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Cart