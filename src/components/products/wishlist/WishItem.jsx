import React, { useState, useEffect } from 'react'
import { Typography } from '@mui/material'
import LazyImage from '../../images/LazyImage'
import WishButton from '../../buttons/WishButton'
import { API_URL_LINK } from '../../../utils/constants'
import bottleLoaderImg from '../../../assets/images/bottle-loader.png'
import '../../../assets/styles/wishItem.css'
import { Link, useNavigate } from 'react-router-dom'
import AddToCartButton from '../../buttons/AddToCartButton'

/**
 * Wish item component. Render an item into the wishlist.
 * 
 * @param {Object} props - The properties of the component. 
 * @param {String} props.product - The corresponding product.
 * @returns {JSX.Element} - Rendered component.
 */
const WishItem = ({ product }) => {
    const navigate = useNavigate();

    /**
     * Redirects to the respective product details page.
     */
    const handleClick = () => {
        navigate(`/products/${product._id}`)
    }
    
    return (
        <div className='item-container'>
            <div
                className='item-detail'
                onClick={handleClick}
            >
                <LazyImage
                    src={product.imgUrl}
                    placeholderSrc={bottleLoaderImg}
                    style={{ width: 70, height: 70 }}
                />
            </div>
            <div
                className='item-detail'
                onClick={handleClick}
            >
                <Typography
                    variant='h6'
                    textAlign={'center'}
                >
                    {product.name}
                </Typography>

                <div
                className='item-detail'
            >
                <Typography
                    variant='h6'
                    textAlign={'center'}
                >
                    {product.price.currency} {product.price.value}
                </Typography>
            </div>
            </div>
            <div className='item-detail'>
                <WishButton productId={product._id} />
                <AddToCartButton product={product} />
            </div>
        </div>
    )
}

export default WishItem