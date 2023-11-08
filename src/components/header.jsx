import {useState} from 'react';
import '../assets/styles/header.css'
import {AppBar, Typography, Toolbar} from '@mui/material';
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
    

    return (
        <AppBar color=''>
            <Toolbar className="header" style={{ flexDirection: active === 'center-header' ? 'row' : 'column' }}>
                <div className='responsive-menu' onClick={menuToggle} style={{ marginTop: active === 'center-header' ? (0) : (30) }}>
                <GiHamburgerMenu className='hamburguer-menu' style={{ display: active === 'center-header' ? 'block' : 'none' }} />
                <RxCross2 className='cancel-hamburguer-menu' style={{ display: active === 'center-header' ? 'none' : 'block' }} onClick={closeMenu} />
                </div>
                <div className="left-header" style={{ display: active === 'center-header' ? 'block' : 'none' }}>
                <Typography color="primary">
                    The Liko
                </Typography>
                </div>
                <div className={active}>
                <ul className='menu'>
                <li>
                                <Typography color="primary">Liquors</Typography>
                                </li>
                                <li>
                                <Typography color="primary">Soft Drinks</Typography>
                                </li>
                                <li>
                                <Typography color="primary">Extras</Typography>
                                </li>
                                <li>
                                <Typography color="primary">About Us</Typography>
                                </li>
                </ul>
                </div>
                <div className="right-header" style={{ display: active === 'center-header' ? 'flex' : 'none' }}>
                <div className='icons' >
                    <BiUserCircle />
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
                <TiShoppingCart size={25} color="red" />
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default Header