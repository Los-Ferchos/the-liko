import '../assets/styles/header.css'
import {AppBar, Typography, Toolbar} from '@mui/material';
import { TiShoppingCart } from 'react-icons/ti';
import { BiUserCircle } from 'react-icons/bi';

function Header(){
    return (
        <AppBar className="header" >
      <header className="left-header">
        <Toolbar>
        <Typography>The Liko</Typography>
        </Toolbar> 
      </header>
      <header className="center-header">
          <ul>
            <li>Liqueurs</li>
            <li>Soft Drinks</li>
            <li>Extras</li>
          </ul>
      </header>
        <header className="right-header">
          <ul>
            <TiShoppingCart />
            <BiUserCircle />
          </ul>
      </header>
    </AppBar>
    )
}

export default Header