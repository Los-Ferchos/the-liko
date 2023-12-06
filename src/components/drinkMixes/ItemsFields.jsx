import React from 'react';
import { Button, IconButton, Typography } from '@mui/material';
import FieldText from '../fields/FieldText';
import { FaTrash } from 'react-icons/fa';

/**
 * Component for rendering a set of fields for items.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Array} props.items - The array of items.
 * @param {Function} props.setItems - The function to set the items.
 * @param {string} [props.titleLabel=""] - The title label for the items.
 * @param {string} [props.itemLabel=""] - The label for each individual item.
 * @param {number} [props.max=10] - The maximum number of items allowed.
 * @param {string} [props.errorMessage=""] - The error message to display.
 * @param {string} [props.placeholder=""] - The placeholder for the text fields.
 * @param {number} [props.maxLength=50] - The maximum length for each item.
 * @returns {JSX.Element} - The rendered ItemsFields component.
 */
const ItemsFields = ( { 
    items = [], 
    setItems = () => {}, 
    titleLabel = "", 
    itemLabel = "", 
    max = 10, 
    errorMessage = "", 
    placeholder = "",
    maxLength = 50 
} ) => {

    /**
     * Handles the change of an item at a specific index.
     *
     * @param {number} index - The index of the item.
     * @param {string} value - The new value for the item.
     * @returns {void}
     */
    const handleItemChange = (index, value) => {
        const newArray = [...items];
        newArray[index] = value;
        setItems(newArray);
    };

    /**
     * Adds a new item to the items array.
     *
     * @returns {void}
     */
    const addNewItem = () => {
        setItems([...items, ""])
    }

    /**
     * Deletes an item at a specific index.
     *
     * @param {number} index - The index of the item to delete.
     * @returns {void}
     */
    const deleteItem = (index) => {
        const newArray = [...items];
        newArray.splice(index, 1);
        setItems(newArray);
    };

    return (
        <div>
        <Typography marginLeft={3} variant="subtitle1" color={"#555"} marginTop={12}>
            {titleLabel}
        </Typography>
            {items.map((item, index) => (
                <div key={index} style={{ display: "flex", justifyContent: "center" }}>
                    <FieldText
                        label={`${itemLabel} ${index + 1}`}
                        value={item}
                        onChange={(e) => handleItemChange(index, e.target.value)}
                        fullWidth
                        maxLength={maxLength}
                        placeholder={placeholder}
                    />
                    <IconButton 
                        style={{ marginTop: 24 }} 
                        onClick={() => deleteItem(index)}
                        disabled={index === items.length - 1 && items.length === 1}
                    >
                        <FaTrash/>
                    </IconButton>
                </div>
            ))}
            {
                items[items.length - 1].trim() !== "" && items.length < max && (
                    <Button
                        variant='outlined' 
                        style={{ marginTop: 12 }}
                        onClick={addNewItem}
                    >{`Add New ${itemLabel}`}</Button>
                )
            }
            <Typography 
                marginLeft={6} 
                color={"error"} 
                variant="body2" 
                textAlign={"left"}
                marginTop={4}
            >{errorMessage}</Typography>
        </div>
    );
};

export default ItemsFields;
