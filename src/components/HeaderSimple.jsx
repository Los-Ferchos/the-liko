import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../assets/images/icon.svg';

const HeaderSimple = () => {
    const [active, setActive] = useState('center-header');

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 960) {
                setActive('center-header');
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <AppBar color=''>
            <Container style={{ paddingTop: 0, paddingBottom: 0 }}>
                <div className='superior-header'>
                    <Toolbar className="header" style={{ flexDirection: active === 'center-header' ? 'row' : 'column'}}>
                        <Link to="/">
                            <div className="center-header logo-header" style={{ display: active === 'center-header' ? 'flex' : 'none' }}>
                                <ul style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <li>
                                        <div className="logo">
                                            <img src={logo} alt="Home" />
                                        </div>
                                    </li>
                                    <li>
                                        <Typography color="primary">
                                            The Liko
                                        </Typography>
                                    </li>
                                </ul>  
                            </div>
                        </Link>
                    </Toolbar>
                </div>
            </Container>
        </AppBar>
    )
}

export default HeaderSimple;
