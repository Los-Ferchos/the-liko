import React from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { FaSistrix } from 'react-icons/fa';
import '../../assets/styles/search.css'

const SearchBar = ({
  searchText,
  handleChangeSearch,
  onKeyPress,
}) => {
  return (
    <div >
        <TextField 
          size='small'
          placeholder='Search'
          value={searchText}
          onChange={handleChangeSearch}
          fullWidth
          autoComplete='off'
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={onKeyPress}>
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