import { BrowserRouter, Route, Routes } from "react-router-dom"
import Page404 from "./pages/404"
import Home from "./pages/Home"
import AboutUs from "./pages/AboutUs"
import LogIn from "./pages/LogIn"
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import Products from "./pages/Products";
import { useDispatch } from "react-redux"
import {setCategories} from "./store/categorySlice"
import {setSubcategories} from "./store/subcategorySlice"
import {useEffect} from 'react';
import ProductsBySubcategories from "./pages/ProductsBySubcategories";
import Profile from "./pages/Profile";
import { API_URL_LINK } from "./utils/constants";

const theme = createTheme({
  spacing: 2,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      main: '#FF0000',
      hover: '#DB4444'
    },
    gray: {
      main: "#727070"
    },
    gold: {
      main: "#EEBB58"
    },
    black: {
      main: "#000000"
    },
    white: {
      main: "#FFFFFF"
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif', 
    h1: {
      fontFamily: 'Mulish, sans-serif',
    },
    h2: {
      fontFamily: 'Mulish, sans-serif',
    },
    h3: {
      fontFamily: 'Mulish, sans-serif',
    },
    h4: {
      fontFamily: 'Mulish, sans-serif',
    },
    h5: {
      fontFamily: 'Mulish, sans-serif',
    },
    h6: {
      fontFamily: 'Mulish, sans-serif',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '5px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          background: "#fff"
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "5px",
          textTransform: 'none',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          padding: '20px',
          paddingTop: '100px'
        },
      },
    },
  },
});

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`${API_URL_LINK}/categories`)
      .then((response) => response.json())
      .then((data) => {var res = data; dispatch(setCategories(res));})
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    fetch(`${API_URL_LINK}/subcategories`)
      .then((response) => response.json())
      .then((data) => {var res = data; dispatch(setSubcategories(res))})
      .catch((error) => console.error(error));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/about_us' Component={AboutUs} />
          <Route path='/logIn' Component={LogIn} />
          <Route path='/profile' Component={Profile}></Route>
          <Route path='/:name' Component={() => <Products destination="/category" />} />
          <Route path='/:categoryName/all' Component={() => <ProductsBySubcategories/>} />
          <Route path='/:nameCat/:name' Component={() => <Products destination="/subcategory" />} />
          <Route path='/products' Component={Products} />
          <Route path='/404' Component={Page404} />
          <Route path='*' Component={Page404} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App