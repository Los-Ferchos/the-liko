import React from 'react'
import { Button } from '@mui/material';
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

/**
 * EditProductButton component display the edit prodcut button, to edit the information of a product
 * 
 * @param {Object} props - The properties of the component.
 * @returns {JSX.Element} - Rendered EditProductButton component.
 */
function EditProductButton({ product, editLinkRoute }) {
    const navigate = useNavigate()
    return (
        <Button
            variant="outlined"
            color="success"
            startIcon={<FaRegEdit />}
            style={{width:"100%"}}
            onClick={() => navigate(`${editLinkRoute}${product._id}`)}
        >
            Edit Product
        </Button>
    )
}

export default EditProductButton