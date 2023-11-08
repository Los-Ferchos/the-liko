import { BrowserRouter, Route, Routes } from "react-router-dom"
import Page404 from "./pages/404"
import Home from "./pages/Home"
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import Products from "./pages/Products";

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
    grey: {
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
    backgrey:{
      main: "#F2F2F2"
    }
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
          borderRadius: "8px",
          textTransform: 'none',
        },
      },
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='*' Component={Page404} />
          <Route path='/products' Component={Products} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App