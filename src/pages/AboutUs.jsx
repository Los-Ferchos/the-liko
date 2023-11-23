import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import NavigationText from '../components/navText/NavigationText';
import useWindowSize from '../components/hooks/useWindowSize';
import './../assets/styles/about-us.css'
import AdvantagesSection from '../components/aboutUs/AdvantagesSection';
import LikoServicesSection from '../components/aboutUs/LikoServicesSection';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

/**
 * A React component that represents the About Us page.
 * It displays information about The Liko, including its story,
 * advantages, and services.
 */
const AboutUs = () => {
  const { width } = useWindowSize();
  /**
   * Renders the AboutUs component.
   * @returns {JSX.Element} The AboutUs component.
   */
  return (
    <>
    <Container>
      <Header />
      <Box mt={4}>
      <NavigationText inactivePath={[{ title: "Home", href: "/" }]} activePath='About Us' />
      <br />
      <br />
        <Grid container spacing={16}>
          <Grid item xs={12} md={6}>
            <Box>
              <Box className="tab-content">
                <div>
                  <Typography variant="h4" marginTop={4} style={{ fontWeight: 'bold' }}>Our Story</Typography>
                  <Typography variant="h6" marginTop={6}>HI, WE'RE The Liko.</Typography>
                  <Typography variant={width < 768 ? "body2" : "body1"} textAlign={"justify"}>
                    The Liko started as a simple text from one friend to another: “Why can't you get alcohol delivered?" When we realized that alcohol delivery was, in fact, legal, we set out with a little bit of luck and a lotta bit of determination to build a three-tier compliant technology company that would change the way we shop for beer, wine, and spirits.
                  </Typography>
                  <br />
                  <Typography variant={width < 768 ? "body2" : "body1"} textAlign={"justify"}>
                    Today, The Liko is the largest online marketplace for alcohol in North America. Our purpose is to be there when it matters – committed to life's moments and the people who create them. We partner with thousands of retailers in more than 1,400 cities to empower them to grow their businesses and make our customers' good times better. The Liko is available to 100M+ customers and counting across the U.S. and Canada, offering a rich e-commerce shopping experience with personalized content, competitive and transparent pricing, and an unrivaled selection.
                  </Typography>
                </div>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className="about-img" style={{ minHeight: '100%' }}>
              <img
                src="https://i.ibb.co/nb3tRg4/image.png"
                alt="About Us Image"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <AdvantagesSection />

      <LikoServicesSection />
    </Container>
    <Footer />
    </>
  );
};

export default AboutUs;
