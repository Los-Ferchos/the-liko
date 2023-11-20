import Header from '../components/header/Header'
import { Container, Typography, Grid, Button, Card } from '@mui/material'
import NavigationText from '../components/navText/NavigationText'
import CartProduct from '../components/cart/CartProduct'
import '../assets/styles/cart.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalCart } from '../components/contexts/CartContext'

function Cart() {
    const navigate = useNavigate();
    const cart = useGlobalCart();
    const [tax, setTax] = useState(0);

    const getSubtotalProduct = (product) => {
        return (product.quantity * product.productInfo.price.value)
    }

    const getTotal = () => {
        var total = 0;
        {
            cart.cartItems.map((product) => (
                total += getSubtotalProduct(product)
            ))
        }
        return total
    }

    return (
        <Container component={"section"} style={{ position: "relative" }}>
            <Header />
            <NavigationText
                inactivePath={[{ title: "Home", href: "/" }]}
                activePath='Cart'
            />
            <Typography variant='h4' color='primary' component='h1' marginTop={8} marginBottom={8}>Shopping Cart</Typography>
            {
                cart.cartItems.length > 0 ?
                    <div >
                        <div className='container'>
                            <div className='products'>
                                <div style={{ padding: 20 }}>
                                    <div className='title-details'>
                                        <Typography variant='h5' color='black' component='h1' style={{ fontWeight: "bold" }} marginBottom={6} width={"27%"} justifyContent={"center"}>Product</Typography>
                                        <Typography variant='h5' color='black' component='h1' style={{ fontWeight: "bold" }} marginBottom={6} width={"12%"}>Price</Typography>
                                        <Typography variant='h5' color='black' component='h1' style={{ fontWeight: "bold" }} marginBottom={6} width={"18%"}>Quantity</Typography>
                                        <Typography variant='h5' color='black' component='h1' style={{ fontWeight: "bold" }} marginBottom={6} width={"18%"}>Subtotal</Typography>
                                        <Typography variant='h5' color='black' component='h1' style={{ fontWeight: "bold" }} marginBottom={6} width={"12%"}>Trash</Typography>

                                    </div>
                                    {cart.cartItems.map((product, index) => (
                                        <CartProduct
                                            cart={cart}
                                            product={product}
                                            key={index}
                                        />
                                    ))}
                                    <Button variant='outlined' style={{ marginTop: 10 }} onClick={() => {
                                        navigate("/products")
                                    }}>Continue Shopping</Button>
                                </div>
                            </div>
                            <div className='order-summary' style={{ position: "sticky", top: "20px" }}>
                                <Card style={{ padding: 20, alignContent: "center", alignItems: "center" }}>
                                    <div>
                                        <Typography variant='h5' color='black' component='h1' style={{ fontWeight: "bold" }} marginBottom={6}>Order Summary</Typography>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <Typography variant='h6' color='black' component='h1'>Subtotal</Typography>
                                        <Typography variant='h6' color='black' component='h1'>{getTotal()}</Typography>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <Typography variant='h6' color='black' component='h1'>Tax</Typography>
                                        <Typography variant='h6' color='black' component='h1'>{tax}%</Typography>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <Typography variant='h6' color='black' component='h1'>Total</Typography>
                                        <Typography variant='h6' color='black' component='h1'>{((getTotal()) + (getTotal() * tax / 100)).toFixed(2)}</Typography>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <Button variant='outlined' style={{ marginTop: 10, alignContent: "center" }}
                                            onClick={() => {
                                                navigate("/checkout")
                                            }}>Checkout</Button>
                                    </div>

                                </Card>
                            </div>
                        </div>
                    </div>
                    :
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", height: "12vh", padding: "150px" }}>
                        <Typography variant='h5' color='black' component='h1' style={{ fontWeight: "bold" }} marginBottom={6}>No Items in Cart</Typography>
                        <Button variant='outlined' style={{ marginTop: 10 }} onClick={() => {
                            navigate("/products")
                        }}>Continue Shopping</Button>
                    </div>
            }

        </Container>
    )
}

export default Cart