import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../hooks/store';
import { filterDataArray, getHyphenedString } from '../../utils/methods';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

/**
 * SubcategoriesList component displays a list of subcategories for a given category.
 * 
 * @param {Object} props - The properties of the component.
 * @param {string} props.categoryName - The name of the category for which subcategories should be displayed.
 * @returns {JSX.Element} - Rendered component.
 */
const SubcategoriesList = ({ categoryName = "" }) => {
  const categoriesState = useAppSelector((state) => state.categories.categories);
  const subcategoriesState = useAppSelector((state) => state.subcategories.subcategories);

  const [subcategories, setSubcategories] = useState([]);

  /**
   * useEffect hook to update subcategories when the category or subcategories state changes.
   */
  useEffect(() => {
    /**
     * Retrieves the ID of the category based on its name.
     * @type {Object[]} - Array containing the category with the specified name.
     */
    const idCategory = filterDataArray(categoriesState, "name", categoryName);

    if (idCategory.length > 0) {
      /**
       * Retrieves subcategories for the given category ID.
       * @type {Object[]} - Array containing subcategories for the specified category.
       */
      const subcategoriesArr = subcategoriesState.filter((subcat) => subcat.category === idCategory[0]._id);

      if (subcategoriesArr.length > 0) subcategoriesArr.push({ name: "All", _id: "all" });

      setSubcategories(subcategoriesArr);
    }
  }, [categoriesState, subcategoriesState, categoryName]);

  return (
    <div style={{ marginTop: subcategories.length > 0 ? 10 : 0 }}>
      {subcategories.map((sub, index) => (
        <Link key={sub._id} to={getHyphenedString(sub.name)} className='active-link'>
          <Button
            style={{ marginRight: 4, marginTop: 8, color: "black" }}
            variant='outlined'
            color="gray"
          >
            {sub.name}
          </Button>
        </Link>
      ))}
    </div>
  );
};

export default SubcategoriesList;
