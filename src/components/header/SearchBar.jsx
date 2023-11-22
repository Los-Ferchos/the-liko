import React from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { FaSistrix } from 'react-icons/fa';
import '../../assets/styles/search.css'

const SearchBar = ({
  handleIconClick,
  searchText,
  setSearchText,
  onKeyPress,
}) => {
  return (
    <div className={`search-bar ${isVisible ? 'visible' : 'hidden'}`}>
        <TextField
          size='small'
          placeholder='Search'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          fullWidth
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