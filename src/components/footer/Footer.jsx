import React from 'react';
import { Container, Grid, Typography, Link } from '@mui/material';
import { FaTwitter } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import '../../assets/styles/footer.css';
import { useGlobalCart } from '../contexts/CartContext';

/**
 * Footer component for the application.
 * Displays links to user account, information about The Liko, and social media links.
 *
 * @component
 * @returns {JSX.Element} Rendered Footer component.
 */
const Footer = () => {
  const { userLogged } = useGlobalCart();

  return (
    <footer className="footer">
      <Container style={{ padding: 0 }}>
        <Grid container spacing={3} className="footer-container" justifyContent="center" alignItems="center">
          <Grid item xs={10} sm={4}>
            <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold', textAlign: 'center' }}>
              My Account
            </Typography>
            <Typography variant="subtitle1" style={{ textAlign: 'center' }}>
              <Link color="inherit" href={userLogged ? "/profile" : "/login"}>
                Profile
              </Link>
            </Typography>
            <Typography variant="subtitle1" style={{ textAlign: 'center' }}>
              <Link href="/logIn" color="inherit">
                Log In
              </Link>
            </Typography>
            <Typography variant="subtitle1" style={{ textAlign: 'center' }}>
              <Link href="/sign_up" color="inherit">
                Create Account
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={10} sm={4}>
            <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold', textAlign: 'center' }}>
              About The Liko
            </Typography>
            <Typography variant="subtitle1" style={{ textAlign: 'center' }} >
              <Link href="/about_us" color="inherit">
                About us
              </Link>
            </Typography>
            <Typography variant="subtitle1" style={{ textAlign: 'center' }}>
              <Link href="/drink-mixes" color="inherit">
                The Liko Drinks
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={10} sm={4}>
            <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold', textAlign: 'center' }}>
              Social Links
            </Typography>
            <Typography variant="subtitle1" style={{ textAlign: 'center' }}>
              <Link href="https://twitter.com/TheLikoMaster" target="_blank" color="inherit">
                <FaTwitter /> Twitter
              </Link>
            </Typography>
            <Typography variant="subtitle1" style={{ textAlign: 'center' }}>
              <Link href="https://www.facebook.com/profile.php?id=61554021591232&is_tour_completed=true" target="_blank" color="inherit">
                <FaFacebookSquare /> Facebook
              </Link>
            </Typography>
            <Typography variant="subtitle1" style={{ textAlign: 'center' }}>
              <Link href="https://www.instagram.com/the_liko_ecommerce/" target="_blank" color="inherit">
                <FaInstagram /> Instagram
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;