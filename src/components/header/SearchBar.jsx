// SearchBar.jsx
import React from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { FaSistrix } from 'react-icons/fa';
import '../../assets/styles/search.css';

/**
 * @typedef {Object} SearchBarProps
 * @property {string} searchText - El texto actual del campo de búsqueda.
 * @property {function} handleChangeSearch - Función para manejar cambios en el texto de búsqueda.
 * @property {function} onKeyPress - Función para manejar eventos de pulsación de tecla.
 * @property {function} onButtonClick - Función para manejar eventos de clic en el botón de búsqueda.
 */

/**
 * Componente de barra de búsqueda.
 * @param {SearchBarProps} props - Propiedades del componente.
 * @returns {JSX.Element} Elemento JSX renderizado del componente.
 */
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
