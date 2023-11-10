import { BrowserRouter, Route, Routes } from "react-router-dom"
import Page404 from "./pages/404"
import Home from "./pages/Home"
import Liquors from "./pages/Liquors"
import SoftDrinks from "./pages/SoftDrinks"
import Extras from "./pages/Extras"
import AboutUs from "./pages/AboutUs"
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import Products from "./pages/Products";
import { useDispatch } from "react-redux"
import {setCategories} from "./store/categorySlice"
import {setSubcategories} from "./store/subcategorySlice"
import {useEffect} from 'react';

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
    fetch('http://localhost:8080/categories')
      .then((response) => response.json())
      .then((data) => {var res = data; dispatch(setCategories(res));})
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:8080/subcategories')
      .then((response) => response.json())
      .then((data) => {var res = data; dispatch(setSubcategories(res))})
      .catch((error) => console.error(error));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/liquors' Component={Liquors} />
          <Route path='/soft_drinks' Component={SoftDrinks} />
          <Route path='/extras' Component={Extras} />
          <Route path='/about_us' Component={AboutUs} />
          <Route path='/products' Component={Products} />
          <Route path='*' Component={Page404} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App