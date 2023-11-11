import {useState, useEffect} from 'react';
import '../assets/styles/header.css'
import {AppBar, Typography, Toolbar, Container} from '@mui/material';
import { Link } from "react-router-dom";
import { TiShoppingCart } from 'react-icons/ti';
import { BiUserCircle } from 'react-icons/bi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RxCross2 } from 'react-icons/rx';
import { useAppSelector } from './hooks/store';
import Subcategories from './Subcategories'
import logo from "../assets/images/icon.svg"
import { getHyphenedString } from '../utils/methods';

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
        handleCategoryClick("");
        
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

    const categories = useAppSelector((state) => state.categories.categories);
    const [category, setCategory] = useState("");

    const handleCategoryClick = (newCategory) => {
        setCategory(newCategory);
        subMenuToggle()
        if(window.innerWidth <= 960) {
            setActive('disabled');
        }
    };

    const handleCategoryHover = (newCategory) => {
        setSubMenuActive("disabled")
        setCategory(newCategory);
        setSubMenuActive("enabled")
    };

    const [subMenuActive, setSubMenuActive] = useState("disabled");
    const subMenuToggle = () => {
        if (subMenuActive === 'disabled') {
            setSubMenuActive('enabled');
        } else {
            setSubMenuActive('disabled');
        }
    }

    return (
        <AppBar color=''>
            <Container style={{ paddingTop: 0, paddingBottom: 0 }}>
                <div className='superior-header'>
                <Toolbar className="header" style={{ flexDirection: active === 'center-header' ? 'row' : 'column'}}>
                    <div className='responsive-menu' onClick={menuToggle} style={{ marginTop: active === 'center-header' ? (0) : (30) }}>
                        <GiHamburgerMenu className='hamburguer-menu' style={{ display: active === 'center-header' ? 'block' : 'none' }} size={25}/>
                        <RxCross2 className='cancel-hamburguer-menu' style={{ display: active === 'center-header' ? 'none' : 'block' }} onClick={closeMenu} size={25}/>
                    </div>
                    <Link to="/">
                    <div className="left-header logo-header" style={{ display: active === 'center-header' ? 'flex' : 'none' }}>
                        <ul>
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
                    
                    <div className={active} >
                        <ul className='menu'>
                            <li>
                                <Typography 
                                    color="black" 
                                    className='active-link'
                                    onClick={() => handleCategoryClick("")}
                                    onMouseEnter={() => handleCategoryHover("")}
                                >
                                    <Link  to="/products">All Products</Link>
                                </Typography>
                            </li>
                            {categories && categories.length > 0 && categories.map(category => (
                                <li key={category._id}>
                                <Typography 
                                    color="black" 
                                    className='active-link'
                                    onClick={() => handleCategoryClick(category)}
                                    onMouseEnter={() => handleCategoryHover(category)}
                                >
                                    <Link to={`/${getHyphenedString(category.name)}`}>{category.name}</Link>
                                </Typography>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="right-header" style={{ display: active === 'center-header' ? 'flex' : 'none' }}>
                        <div className='icons' >
                            <BiUserCircle size={25}/>
                        </div>
                        <ul className='profile-options'>
                            <li>
                                <Typography variant="body2" color="black" className='active-link'>Sing In</Typography>
                            </li>
                            <li>
                                <Typography variant="body2" color="black" className='active-link'>|</Typography>
                            </li>
                            <li>
                                <Typography variant="body2" color="black" className='active-link'>Create Account</Typography>
                            </li>
                        </ul>
                        <TiShoppingCart size={25}/>
                    </div>
                </Toolbar>                </div>
                <div className={subMenuActive} onMouseLeave={() => handleCategoryHover("")}>
                    <Subcategories category={category}/>
                </div>
            
            </Container>
        </AppBar>
    )
}

export default Header