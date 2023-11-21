import { Button, Container, Grid, Typography } from '@mui/material'
import React from 'react'
import Header from '../components/header/Header'
import NavigationText from '../components/navText/NavigationText'

const AdminMenu = () => {
  return (
    <Container>
        <Header/>
        <NavigationText inactivePath={[{ title: "Home", href: "/" }]} activePath={"Admin"} />
        <Typography variant='h4' color='primary' component='h1' marginTop={6}>
            Admin Panel
        </Typography>

        <Grid marginTop={32} container spacing={36} justifyContent="center">
            <Grid item xs={12} sm={6} justifyContent={"flex-end"} display={"flex"}>
                <Button variant="outlined" color="primary">
                    Manage Products
                </Button>
            </Grid>

            <Grid item xs={12} sm={6} display={"flex"}>
                <Button disabled variant="outlined" color="primary">
                    Manage Taxes
                </Button>
            </Grid>
        </Grid>
    </Container>
  )
}

export default AdminMenu