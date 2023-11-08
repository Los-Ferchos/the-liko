import {useState, useEffect} from 'react';
import '../assets/styles/header.css'
import {AppBar, Typography, Toolbar} from '@mui/material';
import { Link } from "react-router-dom";
import { TiShoppingCart } from 'react-icons/ti';
import { BiUserCircle } from 'react-icons/bi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RxCross2 } from 'react-icons/rx';


function Header(){
    const [active, setActive] = useState('center-header');

    const menuToggle = () => {
        if (active === 'center-header') {
        setActive('active-menu');
        } else {
        setActive('center-header');
        }
    }

    const closeMenu = () => {
        setActive('center-header');
    }

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
            <Toolbar className="header" style={{ flexDirection: active === 'center-header' ? 'row' : 'column'}}>
                <div className='responsive-menu' onClick={menuToggle} style={{ marginTop: active === 'center-header' ? (0) : (30) }}>
                    <GiHamburgerMenu className='hamburguer-menu' style={{ display: active === 'center-header' ? 'block' : 'none' }} size={25}/>
                    <RxCross2 className='cancel-hamburguer-menu' style={{ display: active === 'center-header' ? 'none' : 'block' }} onClick={closeMenu} size={25}/>
                </div>
                <Link to="/">
                <div className="left-header" style={{ display: active === 'center-header' ? 'flex' : 'none' }}>
                    <ul>
                    <li>
                        <div className="logo">
                        <img src="src/assets/images/icon.svg" alt="Home" />
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
                
                <div className={active} >
                    <ul className='menu'>
                        <li>
                        <Typography color="primary">
                            <Link to="/liquors">Liquors</Link>
                        </Typography>
                        </li>
                        <li>
                        <Typography color="primary">
                            <Link to="/soft_drinks">Soft Drinks</Link>
                        </Typography>
                        </li>
                        <li>
                        <Typography color="primary">
                            <Link to="/extras">Extras</Link>
                        </Typography>
                        </li>
                        <li>
                        <Typography color="primary">
                            <Link to="/about_us">About Us</Link>
                        </Typography>                        </li>
                    </ul>
                </div>
                <div className="right-header" style={{ display: active === 'center-header' ? 'flex' : 'none' }}>
                    <div className='icons' >
                        <BiUserCircle size={25}/>
                    </div>
                    <ul className='profile-options'>
                        <li>
                            <Typography variant="body2" color="primary">Sing In</Typography>
                        </li>
                        <li>
                            <Typography variant="body2" color="primary">|</Typography>
                        </li>
                        <li>
                            <Typography variant="body2" color="primary">Create Account</Typography>
                        </li>
                    </ul>
                    <TiShoppingCart size={25}/>
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default Header