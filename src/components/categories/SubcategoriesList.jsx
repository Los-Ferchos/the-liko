import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../hooks/store';
import { filterDataArray, getHyphenedString } from '../../utils/methods';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const SubcategoriesList = ({ categoryName = "" }) => {
  const categoriesState = useAppSelector((state) => state.categories.categories);
  const subcategoriesState = useAppSelector((state) => state.subcategories.subcategories);

  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    const idCategory = filterDataArray(categoriesState, "name", categoryName);
    if(idCategory.length > 0){
        const subcategoriesArr = subcategoriesState.filter(subcat => subcat.category === idCategory[0]._id);
        if(subcategoriesArr.length > 0) subcategoriesArr.push({ name: "All", _id: "all" });
        setSubcategories(subcategoriesArr);
    }
  }, [categoriesState, subcategoriesState, categoryName]);

  return (
    <div style={{ marginTop: subcategories.length > 0 ? 10 : 0 }}>
        {
            subcategories.map((sub, index) => (
                <Link key={sub._id} to={getHyphenedString(sub.name)} className='active-link'>
                    <Button 
                        style={{ marginRight: 4, marginTop: 8, color: "black" }} 
                        variant='outlined' 
                        color="gray"
                    >{sub.name}</Button>
                </Link>
            ))
        }
    </div>
  )
}

export default SubcategoriesList