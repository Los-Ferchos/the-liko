import React from 'react'
import { IconButton } from '@mui/material';
import { FaRegTrashAlt } from "react-icons/fa";

/**
 * DeleteProductButton component display the delet prodcut button, to delete a product
 * 
 * @param {Object} props - The properties of the component.
 * @returns {JSX.Element} - Rendered DeleteProductButton component.
 */
function DeleteProductButton() {
    return (
        <IconButton
            variant="outlined"
            color="primary"
        >
            <FaRegTrashAlt />
        </IconButton>
    )
}

export default DeleteProductButton