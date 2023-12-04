import React from 'react'
import { Grid, Typography } from '@mui/material'
import LazyImage from '../../images/LazyImage'
import WishButton from '../../buttons/WishButton'
import bottleLoaderImg from '../../../assets/images/bottle-loader.png'
import '../../../assets/styles/wishItem.css'
import { useNavigate } from 'react-router-dom'
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
        <Grid container spacing={2} marginTop={8}>
            <Grid item xs={3} sm={2}>
                <div className='item-detail' onClick={handleClick} style={{ maxWidth: 100 }}>
                    <LazyImage
                        src={product.imgUrl}
                        placeholderSrc={bottleLoaderImg}
                        style={{ width: '100%', height: 'auto' }}
                    />
                </div>
            </Grid>
            <Grid item xs={9} sm={6} className='item-detail'>
                <div className='item-detail' onClick={handleClick}>
                        <Typography variant='h6' align='center'>
                            {product.name}
                        </Typography>
                    <div className='item-detail'>
                        <Typography variant='h6' align='center' marginLeft={12}>
                            {product.price.currency} {product.price.value.toFixed(2)}
                        </Typography>
                    </div>
                </div>
            </Grid>
            <Grid item xs={12} sm={4} className='item-detail'>
                <div className='item-detail'>
                    <WishButton productId={product._id} />
                    <div style={{ marginLeft: 20 }}>
                        <AddToCartButton product={product} />
                    </div>
                </div>
            </Grid>
        </Grid>
    )
}

export default WishItem