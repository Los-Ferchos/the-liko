import { Button, Container, Grid, Typography } from '@mui/material'
import React from 'react'
import Header from '../components/header/Header'
import NavigationText from '../components/navText/NavigationText'
import useWindowSize from '../components/hooks/useWindowSize'
import '../assets/styles/adminPanel.css'

/**
 * AdminMenu component representing the Admin Panel page.
 * @component
 * @return {JSX.Element} AdminMenu component
 */
const AdminMenu = () => {
    /**
     * Custom hook to get the window size.
     * @type {Object}
     * @property {number} width - The width of the window.
     */
    const { width } = useWindowSize();

    return (
        <Container>
            <Header />
            <NavigationText inactivePath={[{ title: "Home", href: "/" }]} activePath={"Admin"} />
            <Typography variant='h4' color='primary' component='h1' marginTop={6}>
                Admin Panel
            </Typography>

            <Grid marginTop={30} container spacing={width > 768 ? 36 : 24} justifyContent="center">
                <Grid item xs={12} sm={width > 768 ? 6 : 12} justifyContent={width > 768 ? "flex-end" : "center"} display={"flex"}>
                    {/* Button for managing products */}
                    <Button variant="outlined" color="primary" className='admin-panel-menu-button'>
                        Manage Products
                    </Button>
                </Grid>

                <Grid item xs={12} sm={width > 768 ? 6 : 12} display={"flex"} justifyContent={width > 768 ? "flex-start" : "center"} >
                    {/* Button for managing taxes */}
                    <Button disabled variant="outlined" color="primary" className='admin-panel-menu-button'>
                        Manage Taxes
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}

export default AdminMenu;