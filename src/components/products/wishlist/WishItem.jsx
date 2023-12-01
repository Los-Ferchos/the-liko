import React, { useState, useEffect } from 'react'
import { Typography } from '@mui/material'
import LazyImage from '../../images/LazyImage'
import WishButton from '../../buttons/WishButton'
import { API_URL_LINK } from '../../../utils/constants'
import bottleLoaderImg from '../../../assets/images/bottle-loader.png'
import '../../../assets/styles/wishItem.css'
import { Link, useNavigate } from 'react-router-dom'

const WishItem = ({ productId = "" }) => {
    const [product, setProduct] = useState();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true)
            try {
                const response = await fetch(`${API_URL_LINK}/products/${productId}`);
                const data = await response.json();
                if (response.ok) {
                    setProduct(data);
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            }
            setLoading(false)
        };
        fetchProduct();
    }, []);

    const handleClick = () => {
        navigate(`/products/${productId}`)
    }
    
    return (
        <div>
            {
                loading ? <div className="full-centered-container"><span className="skeleton-loader"></span></div> : (
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
                        </div>
                        <div className='item-detail'>
                            <WishButton></WishButton>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default WishItem