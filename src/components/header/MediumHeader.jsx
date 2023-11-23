import { useState, useEffect } from 'react';
import { Typography, Toolbar, TextField, InputAdornment, IconButton } from '@mui/material';
import SubcategoriesHeader from './Subcategories';
import logo from '../../assets/images/icon.svg'
import { BiUserCircle } from 'react-icons/bi';
import CustomLink from '../links/CustomLink';
import '../../assets/styles/header.css'
import { Link } from 'react-router-dom';
import { useAppSelector } from "../hooks/store";
import { getHyphenedString } from "../../utils/methods";
import CartIconButton from '../buttons/CartIconButton';
import { useGlobalCart } from '../contexts/CartContext';
import useWindowSize from '../../components/hooks/useWindowSize';
import '../../assets/styles/search.css'
import { FaSistrix } from 'react-icons/fa';


/**
 * This is the header component to show the navigation options for all the app
 * @returns {JSX.Element} Rendered Header component.
 */
const MediumHeader = ({ isSearchVisible, setIsSearchVisible }) => {
    const { width } = useWindowSize();  // Mueve la línea aquí para obtener el valor de width
    const categories = useAppSelector((state) => state.categories.categories);
    const [currentCategory, setCurrentCategory] = useState();
    const { userLogged } = useGlobalCart();
    const [inferiorHeader, setInferiorHeader] = useState('inferior-header-disabled');

    const handleIconClick = () => {
        setIsSearchVisible(!isSearchVisible);
    };
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
                    </ul>
                </div>
                <div className='right-header'>
                    <IconButton onClick={handleIconClick}>
                        <FaSistrix />
                    </IconButton>
                    {
                        userLogged != null ? (
                            <ul className='profile-options'>
                                <li style={{ display: 'flex' }}>
                                    <BiUserCircle />
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
                                    <CustomLink variant="body2" title='Create Account' href='sign_up' />
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