import React from 'react';
import { AppBar, Typography, Toolbar, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/icon.svg';
import '../../assets/styles/header.css';

const HeaderSimple = () => {
  return (
    <AppBar color=''>
      <Container style={{ paddingTop: 0, paddingBottom: 0 }}>
        <div className='superior-header'>
          <Toolbar className='header'>
            <Link to='/'>
              <div className='left-header logo-header'>
                <ul>
                  <li>
                    <div className='logo'>
                      <img src={logo} alt='Home' />
                    </div>
                  </li>
                  <li>
                    <Typography color='primary'>The Liko</Typography>
                  </li>
                </ul>
              </div>
            </Link>
          </Toolbar>
        </div>
      </Container>
    </AppBar>
  );
};

export default HeaderSimple;
