import '../assets/styles/header.css'
import {AppBar, Typography, Toolbar, Button} from '@mui/material';
import { TiShoppingCart } from 'react-icons/ti';
import { BiUserCircle } from 'react-icons/bi';

function Header(){
    return (
        <AppBar className="header" sx={{background:'#FFF'}}>
            <Toolbar sx={{color:'#FF0000'}}>
                <header className="left-header">
                <Typography sx={{color:'#FF0000'}}>The Liko</Typography> 
                </header>
                <header className="center-header">
                    <ul>
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li>
                            <a href="/">Liquors</a>
                        </li>
                        <li>
                            <a href="/">Soft Drinks</a>
                        </li>
                        <li>
                            <a href="/">Extras</a>
                        </li>
                        <li>
                            <a href="/">About Us</a>
                        </li>
                        <li>
                            <input placeholder='Search...'></input>
                        </li>
                    </ul>
                </header>
                <header className="right-header">
                    <ul>
                        <a to="/">Sing In</a>
                        <span> | </span>
                        <a to="/">Create Account</a>
                        <TiShoppingCart />
                    </ul>
                </header>
            </Toolbar>
        </AppBar>
    )
}

export default Header