import { Grid, TextField } from '@mui/material'
import React from 'react'

const FieldText = (
    { 
      label, name, type, value, onChange, required = true, fullWidth = true, multiline, rows = 1, select, children,
      errorMsg = "", handleErrorMsg = () => {}, typeNumber = "int"
    }
) => {

  const handleFocus = (e) => {
    handleErrorMsg(e.target.name, "")
  }



  const validatePrice = (price) => {
    console.log(value)
    if(price[price.length - 1] === ".") return false;
    const priceRegex = /^\d+(\.\d{2})?$/;
    return priceRegex.test(price);
  }

  const handleBlur = (e) => {
    const intValue = parseInt(e.target.value);
    const floatValue = parseFloat(e.target.value);
    if(required && value === "") handleErrorMsg(e.target.name, "This field is required, please fill it");
    else {
      if(type === "number" && (typeNumber === "int" && !isInteger(floatValue))){
        handleErrorMsg(e.target.name, "This field requires an integer value, please fill it just with integers.")
      } 
      if (type === "number" && floatValue < 0){
        handleErrorMsg(e.target.name, "This field requires a positive number, please fill it just with positive numbers.")
      }
      if (type === "number" && isNaN(intValue)){
        handleErrorMsg(e.target.name, "This field requires a number value, please fill it just with numbers.")
      }
      if (type === "number" && typeNumber == "price" && !validatePrice(e.target.value)){
        handleErrorMsg(e.target.name, "Please, introduce a valid price (Integer or number with two decimals)")
      }
    }
  }

  function isInteger(number) {
    return number === Math.floor(number);
  }

  const handleChange = (e) => {
    onChange(e);
  }

  return (
    <Grid item xs={12} sm={12}>
      <TextField
        label={label}
        name={name}
        type={type}
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        required={required}
        fullWidth={fullWidth}
        helperText={errorMsg}
        error={errorMsg !== ""}
        style={{ marginTop: 24 }}
        multiline={multiline}
        rows={rows}
        autoComplete='off'
        select={select}
        variant='outlined'
        SelectProps={{
          MenuProps: {
              style: {
                display: "block"
              },
          },
        }}
      >
        {children}
      </TextField>
    </Grid>
  )
}

export default FieldText