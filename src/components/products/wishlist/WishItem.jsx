import React, { useState, useEffect } from 'react'
import { Typography } from '@mui/material'
import LazyImage from '../../images/LazyImage'
import WishButton from '../../buttons/WishButton'
import { API_URL_LINK } from '../../../utils/constants'

const WishItem = ({ productId = "" }) => {
    const [product, setProduct] = useState()

    useEffect(() => {
        console.log("1")

        const fetchProduct = async () => {
            setLoading(true)
            try {
                const response = await fetch(`${API_URL_LINK}/product/${productId}`);
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


    console.log(product)

    return (
        <div>
            {
                loading ? <div className="full-centered-container"><span className="loader"></span></div> : (
                    <div>
                        <LazyImage
                            src={product.imgUrl}
                            placeholderSrc={bottleLoaderImg}
                            style={{ width: 100, height: 100 }}
                        />
                        <Typography variant='h6'>{product.name}</Typography>
                        <Typography variant="subtitle1">
                            {product.price.currency} {product.price.value}
                        </Typography>
                        <WishButton></WishButton>
                    </div>
                )
            }
        </div>
    )
}

export default WishItem