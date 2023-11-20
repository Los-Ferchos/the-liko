import React from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { FaSistrix } from 'react-icons/fa';
import '../../assets/styles/header.css';

const SearchBar = ({
  width,
  handleIconClick,
  searchText,
  setSearchText,
  onKeyPress,
}) => {
  const isWideScreen = width > 1284;

  return (
    <div className={`search-bar`}>
      {isWideScreen ? (
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
      ) : (
        <IconButton edge="end" onClick={handleIconClick}>
          <FaSistrix />
        </IconButton>
      )}
    </div>
  );
};

export default SearchBar;
