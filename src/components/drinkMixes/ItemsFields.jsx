import React from 'react';
import { Button, IconButton, Typography } from '@mui/material';
import FieldText from '../fields/FieldText';
import { FaTrash } from 'react-icons/fa';

const ItemsFields = ( 
    { items = [], setItems = () => {}, titleLabel = "", itemLabel = "", max = 10, errorMessage = "" } 
) => {

    const handleItemChange = (index, value) => {
        const newArray = [...items];
        newArray[index] = value;
        setItems(newArray);
    };

    const addNewItem = () => {
        setItems([...items, ""])
    }

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
