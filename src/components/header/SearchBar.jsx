import React from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { FaSistrix } from 'react-icons/fa';
import '../../assets/styles/search.css';

const SearchBar = ({
  searchText,
  handleChangeSearch,
  onKeyPress,
  onButtonClick,
}) => {
  const alphanumericRegex = /^[a-zA-Z0-9 ]*$/;

  const handleInputChange = (event) => {
    const inputValue = event.target.value;

    if (inputValue.length <= 256 && alphanumericRegex.test(inputValue)) {
      handleChangeSearch(event);
    }
  };

  return (
    <div style={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
      <TextField
        size='small'
        placeholder='Search'
        value={searchText}
        onChange={handleInputChange}  
        fullWidth
        autoComplete='off'
        sx={{ width: '850px', paddingRight: '5px' }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton edge="end" onClick={onButtonClick}>
                <FaSistrix />
              </IconButton>
            </InputAdornment>
          ),
        }}
        onKeyDown={onKeyPress}
        inputProps={{ maxLength: 256 }} 
      />
    </div>
  );
};

export default SearchBar;
