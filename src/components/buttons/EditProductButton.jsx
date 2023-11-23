import React from 'react'
import { Button } from '@mui/material';
import { FaRegEdit } from "react-icons/fa";

/**
 * EditProductButton component display the edit prodcut button, to edit the information of a product
 * 
 * @param {Object} props - The properties of the component.
 * @returns {JSX.Element} - Rendered EditProductButton component.
 */
function EditProductButton() {
    return (
        <Button
            variant="outlined"
            color="success"
            startIcon={<FaRegEdit />}
            style={{width:"85%"}}
        >
            Edit Product
        </Button>
    )
}

export default EditProductButton