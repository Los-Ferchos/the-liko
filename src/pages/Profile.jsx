import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import Header from '../components/header/Header';
import useWindowSize from '../components/hooks/useWindowSize';
import '../assets/styles/profile.css';
import NavigationText from '../components/navText/NavigationText';
import CustomLink from '../components/links/CustomLink';
import { ConstructionSection, OrderHistorySection, DefaultSection } from '../components/profile/MyProfileSettings';
import ProfileSection from '../components/profile/ProfileSection';
import Footer from '../components/footer/Footer';

/**
 * A React component that displays a profile page for a user to manage their account information.
 *
 * @return {React.Component} A React component representing the profile page.
 */
const Profile = () => {
  const { width } = useWindowSize();
  const [profileSection, setProfileSection] = useState('My Profile'); 

  const renderProfileSection = () => {
    switch (profileSection) {
      case 'My Profile':
        return <ProfileSection />;
      case 'Order History':
        return <OrderHistorySection />;
      case 'My Favorite List':
        return <ConstructionSection />;
      default:
        return <DefaultSection />;
    }
  };

  return (
    <>
    <Container style={{ minHeight: '90vh' }}>
      <Header />
      <NavigationText inactivePath={[{ title: "Home", href: "/" }]} activePath='Profile' />
      <div className="profile-container">
        <div className="order-table">
          <div className='titleSub'> 
          <Typography variant={width < 768 ? "body2" : "body1"} style={{ fontWeight: 'bold' }} > Manage My Account
          </Typography>
          </div>
          <div className='subcategory'><CustomLink  variant={width < 768 ? "body2" : "body3"} title='My Profile' onClick={() => setProfileSection('My Profile')} /></div>
          <div className='subcategory'><CustomLink  variant={width < 768 ? "body2" : "body3"} title='Order History' onClick={() => setProfileSection('Order History')} /></div>
          <div className='subcategory'><CustomLink  variant={width < 768 ? "body2" : "body3"} title='My Favorite List' onClick={() => setProfileSection('My Favorite List')} /></div>
        </div>
        <div className="button-log-out" >
          {renderProfileSection()}
        </div>
      </div>
    </Container>
    <Footer/>

    </>
  );
};

export default Profile;
