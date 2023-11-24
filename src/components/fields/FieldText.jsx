import { Grid, TextField } from '@mui/material'
import React from 'react'

/**
 * FieldText component for rendering text input fields.
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.label - The label for the text field.
 * @param {string} props.name - The name attribute for the text field.
 * @param {string} props.type - The type of the input field.
 * @param {string} props.value - The current value of the input field.
 * @param {function} props.onChange - The callback function to handle input changes.
 * @param {boolean} [props.required=true] - Indicates whether the field is required.
 * @param {boolean} [props.fullWidth=true] - Indicates whether the field should take up the full width.
 * @param {boolean} [props.multiline] - Indicates whether the field is a multiline text field.
 * @param {number} [props.rows=1] - The number of rows for a multiline text field.
 * @param {boolean} [props.select] - Indicates whether the field is a select input.
 * @param {ReactNode} [props.children] - The options for the select input.
 * @param {string} [props.errorMsg=""] - The error message to display.
 * @param {function} [props.handleErrorMsg=()=>{}] - The callback function to handle error messages.
 * @param {string} [props.typeNumber="int"] - The type of number input ('int' or 'price').
 * @param {string} [props.placeholder=""] - The placeholder text for the input field.
 * @param {string} [props.maxLength=500] - The max length text for the input field.
 * @returns {JSX.Element} - The rendered FieldText component.
 */
const FieldText = ({
  label,
  name,
  type,
  value,
  onChange,
  required = true,
  fullWidth = true,
  multiline,
  rows = 1,
  select,
  children,
  errorMsg = "",
  handleErrorMsg = () => {},
  typeNumber = "int",
  placeholder = "",
  maxLength = 500
}) => {

  /**
   * Handles the focus event on the input field.
   * @param {Object} e - The focus event.
   */
  const handleFocus = (e) => {
    handleErrorMsg(e.target.name, "");
  }

  /**
   * Validates a price value to ensure it has at most two decimal places.
   * @param {string} price - The price value to validate.
   * @returns {boolean} - True if the price is valid, false otherwise.
   */
  const validatePrice = (price) => {
    if (price[price.length - 1] === ".") return false;
    const priceRegex = /^\d+(\.\d{2})?$/;
    return priceRegex.test(price);
  }

  /**
   * Handles the blur event on the input field.
   * @param {Object} e - The blur event.
   */
  const handleBlur = (e) => {
    const intValue = parseInt(e.target.value);
    const floatValue = parseFloat(e.target.value);
    if (required && value === "") {
      handleErrorMsg(e.target.name, "This field is required, please fill it");
    } else {
      if (type === "number" && (typeNumber === "int" && !isInteger(floatValue))) {
        handleErrorMsg(e.target.name, "This field requires an integer value, please fill it just with integers.");
      }
      if (type === "number" && floatValue < 0) {
        handleErrorMsg(e.target.name, "This field requires a positive number, please fill it just with positive numbers.");
      }
      if (type === "number" && isNaN(intValue)) {
        handleErrorMsg(e.target.name, "This field requires a number value, please fill it just with numbers.");
      }
      if (type === "number" && typeNumber === "price" && !validatePrice(e.target.value)) {
        handleErrorMsg(e.target.name, "Please, introduce a valid price (Integer or number with two decimals)");
      }
    }
  }

  /**
   * Checks if a number is an integer.
   * @param {number} number - The number to check.
   * @returns {boolean} - True if the number is an integer, false otherwise.
   */
  function isInteger(number) {
    return number === Math.floor(number);
  }

  /**
   * Handles the change event on the input field.
   * @param {Object} e - The change event.
   */
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
        placeholder={placeholder}
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
        inputProps={{ maxLength: maxLength }}
      >
        {children}
      </TextField>
    </Grid>
  );
}

export default FieldText;
