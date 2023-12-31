import { useState, useEffect } from 'react';
import { Typography, Toolbar, IconButton } from '@mui/material';
import SubcategoriesHeader from './Subcategories';
import logo from '../../assets/images/icon.svg'
import CustomLink from '../links/CustomLink';
import '../../assets/styles/header.css'
import { NavLink, Link } from 'react-router-dom';
import { useAppSelector } from "../hooks/store";
import { getHyphenedString } from "../../utils/methods";
import CartIconButton from '../buttons/CartIconButton';
import { useGlobalCart } from '../contexts/CartContext';
import { FaUser } from "react-icons/fa6";
import { FaSistrix } from 'react-icons/fa';

/**
 * This is the header component to show the navigation options for all the app
 * @returns {JSX.Element} Rendered Header component.
 */
const MediumHeader = ({ isSearchVisible, setIsSearchVisible }) => {
    const categories = useAppSelector((state) => state.categories.categories);
    const [currentCategory, setCurrentCategory] = useState();
    const { userLogged } = useGlobalCart();
    const [isUserAdmin, setIsAdmin] = useState(true);
    const [inferiorHeader, setInferiorHeader] = useState('inferior-header-disabled');

    const handleIconClick = () => {
        setIsSearchVisible(!isSearchVisible);
    };

    useEffect(() => {
      if (userLogged) {
        setIsAdmin(userLogged.isAdmin);
      } else{
        setIsAdmin(false);
      }
    }, [userLogged]);


    return (
        <div>
            <Toolbar className='header'>
                <div className='left-header logo-header'>
                    <Link to="/">
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
                    </Link>
                </div>
                <div className='center-header'>
                    <ul className='menu'>
                        <li onMouseOver={() => {
                            setCurrentCategory("")
                            setInferiorHeader('inferior-header-enabled')
                        }}>
                            <CustomLink
                                href='/products'
                                title='All Products'
                                comparePath="products"
                            />
                        </li>
                        {categories.map(category => (
                            <li key={category._id}
                                onMouseOver={() => {
                                    setCurrentCategory(category)
                                    setInferiorHeader('inferior-header-enabled')
                                }}>
                                <CustomLink
                                    href={`/${getHyphenedString(category.name)}`}
                                    title={category.name}
                                />
                            </li>
                        ))}
                            {
                                isUserAdmin && (<li key={"adminKey"}>
                                <CustomLink variant="body2" title='Admin' href='/admin' />
                                </li> )
                            }
                    </ul>
                </div>
                <div className='right-header'>
                    <IconButton onClick={handleIconClick} >
                        <FaSistrix />
                    </IconButton>
                    {
                        userLogged != null ? (
                            <ul className='profile-options'>
                                <li style={{ display: 'flex', gap: '5px' }}>
                                    <NavLink to='/profile'>
                                        <FaUser />
                                    </NavLink>
                                    <CustomLink variant="body2" title='Profile' href='/profile' />
                                </li>
                            </ul>
                        ) : (
                            <ul className='profile-options'>
                                <li>
                                    <CustomLink variant="body2" title='Log In' href='/logIn' />
                                </li>
                                <li>
                                    <Typography variant="body2" color="black">|</Typography>
                                </li>
                                <li>
                                    <CustomLink variant="body2" title='Create Account' href='/sign_up' />
                                </li>
                            </ul>
                        )
                    }
                    <CartIconButton />
                </div>
            </Toolbar>
            <div className={inferiorHeader} onMouseLeave={() => setInferiorHeader('inferior-header-disabled')}>
                <SubcategoriesHeader category={currentCategory} />
            </div>
        </div>
    )
}

export default MediumHeader