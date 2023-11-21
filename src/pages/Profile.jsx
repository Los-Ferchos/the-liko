import React, { useState } from 'react';
import { Container, Button, Typography } from '@mui/material';
import { FaArrowRightFromBracket } from 'react-icons/fa6';
import Header from '../components/header/Header';
import useWindowSize from '../components/hooks/useWindowSize';
import { useGlobalCart } from '../components/contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import OrderTable from '../components/products/table/ControlledAccordionGroup';
import '../assets/styles/profile.css';
import NavigationText from '../components/navText/NavigationText';
import CustomLink from '../components/links/CustomLink';
import { ConstructionSection, ProfileSection, OrderHistorySection, DefaultSection } from '../components/profile/MyProfileSettings';

const Profile = () => {
  const { width } = useWindowSize();
  const { setUserLogged } = useGlobalCart();
  const navigate = useNavigate();
  const [profileSection, setProfileSection] = useState('Manage My Account'); // Valor predeterminado

  const renderProfileSection = () => {
    switch (profileSection) {
      case 'My Profile':
        return <ProfileSection />;
      case 'Address Book':
        return <ConstructionSection />;
      case 'Order History':
        return <OrderHistorySection />;
      case 'My Favorite List':
        return <ConstructionSection />;
      default:
        return <DefaultSection />;
    }
  };

  return (
    <Container>
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
        <div className="button-log-out">
          {renderProfileSection()}
        </div>
      </div>
    </Container>
  );
};

export default Profile;
