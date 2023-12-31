import {AppBar, Container} from '@mui/material';
import useWindowSize from '../hooks/useWindowSize';
import NormalHeader from './MediumHeader'
import SmallHeader from './SmallHeader';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../header/SearchBar';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearch, setSearchText } from '../../store/searchSlice';
import { useAppSelector } from '../hooks/store';

/**
 * This is the header component to show the navigation options for all the app
 * @returns {JSX.Element} Rendered Header component.
 */
const Header = () => {
    const { width } = useWindowSize();
    const limit = 990;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const searchText = useAppSelector((state) => state.search.searchText);
  
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        navigate("/products");
        dispatch(setSearch());
      }
    };
  
    const handleChangeSearch = (e) => {
      dispatch(setSearchText(e.target.value))
    };
  
    const handleSearchButtonClick = () => {
      navigate("/products");
      dispatch(setSearch());
    };
  
    return (
      <AppBar color=''>
        <Container style={{ paddingTop: 0, paddingBottom: '10px' }}>
          {width > limit ? (
            <NormalHeader isSearchVisible={isSearchVisible} setIsSearchVisible={setIsSearchVisible}/>
          ) : (
            <SmallHeader isSearchVisible={isSearchVisible} setIsSearchVisible={setIsSearchVisible}/>
          )}
          {isSearchVisible && (
            <SearchBar
              searchText={searchText}
              handleChangeSearch={handleChangeSearch}
              onKeyPress={handleKeyPress}
              onButtonClick={handleSearchButtonClick} 
              isSearchClicked={isSearchVisible} 
              className='search'
            />
          )}
        </Container>
      </AppBar>
    );
  };
  
  export default Header;