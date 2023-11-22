import {useState} from 'react';
import {Typography, Toolbar, IconButton} from '@mui/material';
import logo from '../../assets/images/icon.svg'
import { GiHamburgerMenu } from 'react-icons/gi';
import { RxCross2 } from 'react-icons/rx';
import { BiUserCircle } from 'react-icons/bi';
import '../../assets/styles/header.css'
import { Link } from 'react-router-dom';
import { useAppSelector } from "../hooks/store";
import { getHyphenedString } from "../../utils/methods";
import CustomLink from '../links/CustomLink';
import CartIconButton from '../buttons/CartIconButton';
import { useGlobalCart } from '../contexts/CartContext';

/**
 * This is the header component to show the navigation options for all the app
 * @returns {JSX.Element} Rendered Header component.
 */
const SmallHeader = () => {
    const categories = useAppSelector((state) => state.categories.categories);
    const [inferiorHeader, setInferiorHeader] = useState('inferior-header-disabled');
    const { userLogged } = useGlobalCart();

    return (
        <div>
            <div className='superior-header'>
                <Toolbar className='header'>
                    <div className='left-header'>
                        <div>
                            <IconButton color='black' style={{display:inferiorHeader==='inferior-header-enabled'?'none':'block'}} onClick={() => {
                                setInferiorHeader('inferior-header-enabled')
                            }}>
                                <GiHamburgerMenu className='hamburguer-menu' size={25}/>
                            </IconButton>
                            <IconButton color='black' style={{display:inferiorHeader==='inferior-header-disabled'?'none':'block'}} onClick={() => {
                                setInferiorHeader('inferior-header-disabled')
                            }}>
                                <RxCross2 className='cancel-hamburguer-menu'  size={25}/>
                            </IconButton>
                        </div>
                    </div>
                    <div className='center logo-header' to="/">
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
                    <div className='right-header'>
                        <Link to={userLogged ? "/profile" : "/login"}>
                            <BiUserCircle size={25}/>
                        </Link>
                        <CartIconButton/>
                    </div>
                </Toolbar>
            </div>
            <div className={inferiorHeader} style={{justifyContent:'center'}}>
                <ul className='small-menu'>
                    <li onClick={() => {
                            setInferiorHeader('inferior-header-disabled')
                        }}>
                        <CustomLink
                            href='/products'
                            title='All Products'
                            comparePath="products"
                        />
                    </li>
                    {categories.map(category => (
                        <li key={category._id} onClick={() => {
                            setInferiorHeader('inferior-header-disabled')
                        }}>
                            <CustomLink
                                href={`/${getHyphenedString(category.name)}`}
                                title={category.name}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        
    )
}

export default SmallHeader