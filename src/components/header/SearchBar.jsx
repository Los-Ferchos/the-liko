// SearchBar.jsx
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
  return (
    <div style={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }} >
      <TextField
        size='small'
        placeholder='Search'
        value={searchText}
        onChange={handleChangeSearch}
        fullWidth
        autoComplete='off'
        sx={{ width: '850px', paddingRight: '5px' }} 
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton edge="end" onClick={onButtonClick} >
                <FaSistrix />
              </IconButton>
            </InputAdornment>
          ),
        }}
        onKeyDown={onKeyPress}
      />
    </div>
  );
};

export default SearchBar;
