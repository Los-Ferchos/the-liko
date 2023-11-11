import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Container, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { capitalizeString, filterDataArray } from '../utils/methods'
import { useAppSelector } from '../components/hooks/store'

const ProductsBySubcategories = () => {
  const { categoryName } = useParams();

  const categoriesState = useAppSelector((state) => state.categories.categories);
  const subcategoriesState = useAppSelector((state) => state.subcategories.subcategories);

  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    const idCategory = filterDataArray(categoriesState, "name", categoryName);
    if(idCategory.length > 0){
        setSubcategories(subcategoriesState.filter(subcat => subcat.category === idCategory[0]._id));
    }
  }, [categoriesState, subcategoriesState, categoryName]);

  return (
    <Container>
        <Header/>
        Subcategorized Products - Still in development
        <Typography>
            Category: {capitalizeString(categoryName)}    
        </Typography>   
        <Typography>
            Subcategories:    
        </Typography>     
        {
            subcategories.map(subcat => (
                <React.Fragment key={subcat._id}>
                    <Typography>Id: {subcat._id}</Typography>
                    <Typography>Name: {subcat.name}</Typography>
                </React.Fragment>
            ))
        }
    </Container>
  )
}

export default ProductsBySubcategories