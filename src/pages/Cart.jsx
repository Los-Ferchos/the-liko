import Header from '../components/header/Header'
import { Container, Typography, Button, Card } from '@mui/material'
import NavigationText from '../components/navText/NavigationText'
import CartProduct from '../components/cart/CartProduct'
import '../assets/styles/cart.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalCart } from '../components/contexts/CartContext'
import Footer from '../components/footer/Footer';
import { useAppSelector } from '../components/hooks/store'

/**
 * This the cart page to render all the products and details in the shopping cart.
 * 
 * @returns {JSX.Element} Rendered Cart component.
 */
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

    const currencyCode = useAppSelector((state) => state.location.currency);

    return (
        <>
        <Container component={"section"} style={{ position: "relative" }}>
            <Header />
            <NavigationText
                inactivePath={[{ title: "Home", href: "/" }]}
                activePath='Cart'
            />
            <Typography variant='h4' color='primary' component='h1' marginTop={8} marginBottom={8}>Shopping Cart</Typography>
            {
                cart.cartItems.length > 0 || cart.isLoadingGettingItems ?
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
                                    {
                                        cart.isLoadingGettingItems ?
                                            <div className="loader-container center" style={{ position: 'center' }}>
                                                <div className="loader" style={{ position: 'center' }}></div>
                                            </div> :
                                            cart.cartItems.map((product, index) => (
                                                <CartProduct
                                                    cart={cart}
                                                    product={product}
                                                    key={index}
                                                />
                                            ))
                                    }

                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <Button variant='outlined' style={{ marginTop: 10 }} onClick={() => {
                                            navigate("/products")
                                        }}>Continue Shopping</Button>
                                        <Button variant='outlined' style={{ marginTop: 10 }} onClick={() => {
                                            cart.clearShoppingCart()
                                        }}>Clear All</Button>
                                        <Button variant='contained' style={{ marginTop: 10, alignContent: "center" }}
                                            onClick={() => {
                                                navigate("/checkout")
                                            }}>Checkout</Button>
                                    </div>
                                </div>
                            </div>
                            <div className='order-summary'>
                                <Card style={{ padding: 20, alignContent: "center", alignItems: "center" }}>
                                    <div>
                                        <Typography variant='h5' color='black' component='h5' style={{ fontWeight: "bold" }} marginBottom={6}>Order Summary</Typography>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <Typography variant='h6' color='black' component='h6'>Subtotal</Typography>
                                        <Typography variant='h6' color='black' component='h6' display={"flex"} alignItems={"flex-end"}>
                                            <Typography marginLeft={4}>&nbsp;{currencyCode}</Typography>&nbsp;{getTotal().toFixed(2)}
                                        </Typography>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <Typography variant='h6' color='black' component='h6'>Tax</Typography>
                                        <Typography variant='h6' color='black' component='h6'>{tax}%</Typography>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <Typography variant='h6' color='black' component='h6'>Total</Typography>
                                        <Typography variant='h6' color='black' component='h6' display={"flex"} alignItems={"flex-end"}>
                                            <Typography marginLeft={4} marginBottom={1}>&nbsp;{currencyCode}</Typography>
                                            &nbsp;{getTotal().toFixed(2)}
                                        </Typography>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <Button variant='contained' style={{ marginTop: 10, alignContent: "center" }}
                                            onClick={() => {
                                                navigate("/checkout")
                                            }}>Checkout</Button>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                    :
                    <div className='no-items'>
                        <Typography variant='h5' color='black' component='h1' style={{ fontWeight: "bold" }} marginBottom={6}>No Items in Cart</Typography>
                        <Button variant='outlined' style={{ marginTop: 10 }} onClick={() => {
                            navigate("/products")
                        }}>Continue Shopping</Button>
                    </div>
            }
        </Container>
        <Footer />
        </>
    )
}

export default Cart