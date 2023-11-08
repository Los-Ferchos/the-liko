import React from 'react';
import { Box, Container, Typography, Grid, Breadcrumbs, Link, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { FaStore, FaMoneyBillWave, FaShoppingBag, FaMoneyCheck, FaShippingFast, FaHeadset, FaShieldAlt} from "react-icons/fa";
import { CheckCircle, Extension, Security, TrendingUp } from '@mui/icons-material';

/**
 * A React component that displays the advantages of The Liko.
 * It renders a set of boxes with icons, numbers, and titles.
 */
const AdvantagesSection = () => {
  
  // Array of advantages with icons, numbers, and titles
  const advantages = [
    { icon: <FaStore fontSize="2.2rem" />, number: "10.5", title: "Sellers active our site" },
    { icon: <FaMoneyBillWave FaMoneyCheckDollar fontSize="2.2rem" />, number: "5", title: "Different payment methods" },
    { icon: <FaShoppingBag fontSize="2.2rem" />, number: "3", title: "Customers active in our site" },
    { icon: <FaMoneyCheck fontSize="2.2rem" />, number: "4", title: "Annual gross sale in our site" },
  ];

  /**
   * Renders the AdvantagesSection component.
   * @returns {JSX.Element} The AdvantagesSection component.
   */
  return (
    <Box mt={4}>
      <Typography variant="h4" textAlign="center">Advantages of The Liko</Typography>
      <Grid container spacing={3}>
        {advantages.map((advantage, index) => (
          <Grid item xs={12} md={3} key={index}>
            <Paper elevation={3} className="advantage-box">
              <Box p={3} textAlign="center">
                {advantage.icon}
                <Typography variant="h6" component="div" style={{ fontWeight: 'bold' }}>
                  {advantage.number}
                </Typography>
                <Typography variant="body1" style={{ fontWeight: 'normal' }}>
                  {advantage.title}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

/**
 * A React component that displays the services provided by The Liko.
 * It renders a set of boxes with icons, numbers, and titles.
 */
const LikoServicesSection = () => {
  
  // Array of services with icons, numbers, and titles
  const services = [
    { icon: <FaShippingFast fontSize="2.2rem" />, title: "INFORMATION AND RECOMMENDATION", ReportBody: ""},
    { icon: <FaHeadset fontSize="2.2rem" />, title: "24/7 CUSTOMER SERVICE" },
    { icon: <FaShieldAlt fontSize="2.2rem" />, title: "PREPARATION OF EACH BEVERAGE" },
  ];

  /**
   * Renders the LikoServicesSection component.
   * @returns {JSX.Element} The LikoServicesSection component.
   */
  return (
    <Box mt={4}>
      <Typography variant="h4"textAlign="center">The Liko Services</Typography>
      <Grid container spacing={3}>
        {services.map((service, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper elevation={3} className="advantage-box">
              <Box p={3} textAlign="center">
                {service.icon}
                <Typography variant="h6" component="div" style={{ fontWeight: 'bold' }}>
                  {service.number}
                </Typography>
                <Typography variant="body1" style={{ fontWeight: 'normal' }}>
                  {service.title}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

/**
 * A React component that represents the About Us page.
 * It displays information about The Liko, including its story,
 * advantages, and services.
 */
const AboutUs = () => {
  /**
   * Renders the AboutUs component.
   * @returns {JSX.Element} The AboutUs component.
   */
  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <Breadcrumbs separator="›">
          <Link component={RouterLink} to="/">Home</Link>
          <Link component={RouterLink} to="/aboutUs">About</Link>
        </Breadcrumbs>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Box p={2}>
              <Box p={2} className="tab-content">
                {/* ABOUT CONTENT */}
                <div hidden={0 !== 0}>
                  <Typography variant="h4">Our Story</Typography>
                  <Typography variant="h6">HI, WE'RE The Liko.</Typography>
                  <Typography variant="body1">
                    The Liko started as a simple text from one friend to another: “Why can't you get alcohol delivered?" When we realized that alcohol delivery was, in fact, legal, we set out with a little bit of luck and a lotta bit of determination to build a three-tier compliant technology company that would change the way we shop for beer, wine, and spirits.
                  </Typography>
                  <Typography variant='body1'>
                    Today, The Liko is the largest online marketplace for alcohol in North America. Our purpose is to be there when it matters – committed to life's moments and the people who create them. We partner with thousands of retailers in more than 1,400 cities to empower them to grow their businesses and make our customers' good times better. The Liko is available to 100M+ customers and counting across the U.S. and Canada, offering a rich e-commerce shopping experience with personalized content, competitive and transparent pricing, and an unrivaled selection.
                  </Typography>
                </div>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className="about-img" bgcolor="primary.main" style={{ minHeight: '100%' }}>
              {/* Imagen de perfil u otra imagen */}
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Sección "Advantages of The Liko" */}
      <AdvantagesSection />

      {/* Sección "The Liko Services" */}
      <LikoServicesSection />
    </Container>
  );
};

export default AboutUs;
