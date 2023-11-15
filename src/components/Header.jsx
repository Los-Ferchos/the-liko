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
import CustomLink from './links/CustomLink';

/**
 * This is the header component to show the navigation options for all the app
 * @returns {JSX.Element} Rendered Header component.
 */
const Header = () => {
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
                                <CustomLink
                                    onClick={() => handleCategoryClick("")}
                                    onMouseEnter={() => handleCategoryHover("")}
                                    href='/products'
                                    title='All Products'
                                    comparePath="products"
                                />
                            </li>
                            {categories && categories.length > 0 && categories.map(category => (
                                <li key={category._id}>
                                    <CustomLink
                                        onClick={() => handleCategoryClick(category)}
                                        onMouseEnter={() => handleCategoryHover(category)}
                                        href={`/${getHyphenedString(category.name)}`}
                                        title={category.name}
                                    />
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
                                <CustomLink variant="body2" title='Log In' href= '/logIn'/>
                            </li>
                            <li>
                                <Typography variant="body2" color="black">|</Typography>
                            </li>
                            <li>
                                <CustomLink variant="body2" title='Create Account'/>
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