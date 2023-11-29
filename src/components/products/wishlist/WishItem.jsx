import React from 'react'
import { Typography } from '@mui/material'
import LazyImage from '../../images/LazyImage'
import WishButton from '../../buttons/WishButton'

function WishItem({ product }) {
    return (
        <div>
            <LazyImage
                src={product.productInfo.imgUrl}
                placeholderSrc={bottleLoaderImg}
                style={{ width: 100, height: 100 }}
            />
            <Typography variant='h6'>{product.productInfo.name}</Typography>
            <Typography variant="subtitle1">
                {product.productInfo.price.currency} {product.productInfo.price.value}
            </Typography>
            <WishButton></WishButton>
        </div>
    )
}

export default WishItem