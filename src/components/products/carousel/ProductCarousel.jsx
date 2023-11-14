import { useEffect, useState } from 'react';
import ProductsList from '../list/ProductsList';
import { Typography } from '@mui/material';
import CustomLink from '../../links/CustomLink';
import { capitalizeString, getHyphenedString } from '../../../utils/methods'


function ProductCarousel({ apiUrl = "", categoryName="", subcat }) {
    const [products, setProducts] = useState([]);
    const [first, setFirst] = useState();
    const [last, setLast] = useState();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
              const response = await fetch(`${apiUrl}`);
              if (response.ok) {
                const data = await response.json();
                setProducts(data.products);
              }
            } catch (error) {
              console.log(error)
            }
          };
        fetchProducts();
    }, [apiUrl])

    
    return(
        <div>
            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
            <Typography variant='h6' color='primary' component='h1' marginTop={6}>
                {capitalizeString(subcat.name)}
            </Typography>
            <CustomLink
                href={`/${categoryName}/${getHyphenedString(subcat.name)}`}
                title='View All'
            />
            </div>
            <ProductsList products={products} />
        </div>
    )
}

export default ProductCarousel;
