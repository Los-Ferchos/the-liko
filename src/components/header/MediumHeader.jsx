import { useState } from 'react';
import { Typography, Toolbar, TextField, IconButton } from '@mui/material';
import SubcategoriesHeader from './Subcategories';
import logo from '../../assets/images/icon.svg'
import { BiUserCircle } from 'react-icons/bi';
import CustomLink from '../links/CustomLink';
import '../../assets/styles/header.css'
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from "../hooks/store";
import { getHyphenedString } from "../../utils/methods";
import CartIconButton from '../buttons/CartIconButton';
import { useGlobalCart } from '../contexts/CartContext';
import { useDispatch } from 'react-redux';
import { setSearch, setSearchText } from '../../store/searchSlice';
import { FaSearch } from 'react-icons/fa';

/**
 * This is the header component to show the navigation options for all the app
 * @returns {JSX.Element} Rendered Header component.
 */
const MediumHeader = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const categories = useAppSelector((state) => state.categories.categories);
    const [currentCategory, setCurrentCategory] = useState();
    const { userLogged } = useGlobalCart();
    const [inferiorHeader, setInferiorHeader] = useState('inferior-header-disabled');

    const searchText = useAppSelector((state) => state.search.searchText);

    const handleChangeSearch = (e) => {
        dispatch(setSearchText(e.target.value))
    }

    const handleSearch = () => {
        navigate("/products");
        dispatch(setSearch());
    }

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
                <TextField
                    value={searchText}
                    onChange={handleChangeSearch}
                    autoComplete='off'
                />
                <IconButton onClick={handleSearch}>
                    <FaSearch/>
                </IconButton>
                <div className='right-header'>
                    {
                        userLogged != null ? (
                            <ul className='profile-options'>
                                <li style={{ display: 'flex' }}>
                                    <BiUserCircle/>
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