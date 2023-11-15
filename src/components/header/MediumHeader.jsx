import {useState} from 'react';
import {Typography, Toolbar} from '@mui/material';
import SubcategoriesHeader from './Subcategories';
import logo from '../../assets/images/icon.svg'
import { TiShoppingCart } from 'react-icons/ti';
import CustomLink from '../links/CustomLink';
import '../../assets/styles/header.css'
import { Link } from 'react-router-dom';
import { useAppSelector } from "../hooks/store";
import { getHyphenedString } from "../../utils/methods";

/**
 * This is the header component to show the navigation options for all the app
 * @returns {JSX.Element} Rendered Header component.
 */
const MediumHeader = () => {
    const categories = useAppSelector((state) => state.categories.categories);
    const [currentCategory, setCurrentCategory] = useState()
    const [inferiorHeader, setInferiorHeader] = useState('inferior-header-disabled')

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
                    <ul className='profile-options'>
                        <li>
                            <CustomLink variant="body2" title='Log In' href= '/logIn' />
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
            </Toolbar>
            <div className={inferiorHeader} onMouseLeave={() => setInferiorHeader('inferior-header-disabled')}>
                <SubcategoriesHeader category={currentCategory}/>
            </div>
        </div>
    )
}

export default MediumHeader