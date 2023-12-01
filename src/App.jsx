import { BrowserRouter, Route, Routes } from "react-router-dom"
import Page404 from "./pages/404"
import Home from "./pages/Home"
import AboutUs from "./pages/AboutUs"
import LogIn from "./pages/LogIn"
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import Products from "./pages/Products";
import Checkout from "./pages/Checkout";
import { useDispatch } from "react-redux"
import {changeLoadingCategories, setCategories} from "./store/categorySlice"
import {changeLoadingSubcategories, setSubcategories} from "./store/subcategorySlice"
import {useEffect, useState} from 'react';
import ProductsBySubcategories from "./pages/ProductsBySubcategories";
import Profile from "./pages/Profile";
import { API_URL_LINK } from "./utils/constants";
import SignUp from "./pages/SignUp"
import Cart from "./pages/Cart"
import AdminMenu from "./pages/AdminMenu"
import AddProductFormPage from "./pages/AddProductFormPage"
import AdminViewProducts from "./pages/AdminViewProducts"
import EditProductFormPage from "./pages/EditProductFormPage"
import { useGlobalCart } from "./components/contexts/CartContext"
import ProductDetails from "./pages/ProductDetails"
import { getLocalCurrencyCode } from "./utils/methods"
import { changeCurrency, changeLoading } from "./store/locationSlice"
import ComboFormPage from "./pages/ComboFormPage"
import DrinkMixFormPage from "./pages/DrinkMixFormPage"
import DrinkMixDetail from "./pages/DrinkMixDetail"

/**
 * Theme configuration for the MUI components.
 */
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
    red: {
      main: '#EEBB58',
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
          paddingTop: '100px',
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          display: 'flex',
          width: '100%',
          flexDirection: 'column'
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          display: 'flex',
          width: '100%',
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center"
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: '13.5px',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '16px',
        },
      },
    },
  },
});

/**
 * Main application component.
 * @component
 * @returns {JSX.Element} - The rendered App component.
 */
const App = () => {
  const dispatch = useDispatch();
  const [isUserAdmin, setIsAdmin] = useState(true);
  const { userLogged } = useGlobalCart();

  /**
   * Effect hook to check and set user admin status.
   */
  useEffect(() => {
    if (userLogged) {
      setIsAdmin(userLogged.isAdmin);
    } else{
      setIsAdmin(false);
    }
  }, [userLogged])

  /**
   * Effect hook to fetch and set categories from the API.
   */
  useEffect(() => {
    dispatch(changeLoadingCategories(true));
    fetch(`${API_URL_LINK}/categories`)
      .then((response) => response.json())
      .then((data) => {const res = data; dispatch(setCategories(res));})
      .catch((error) => console.error(error));
    dispatch(changeLoadingCategories(false));
  }, []);

  /**
   * Effect hook to fetch and set subcategories from the API.
   */
  useEffect(() => {
    dispatch(changeLoadingSubcategories(true));
    fetch(`${API_URL_LINK}/subcategories`)
      .then((response) => response.json())
      .then((data) => {const res = data; dispatch(setSubcategories(res))})
      .catch((error) => console.error(error));
    dispatch(changeLoadingSubcategories(false));
  }, []);

  /**
   * Effect hook to fetch and set the local currency code.
   */
  useEffect(() => {
    dispatch(changeLoading(true));

    const fetchLocationInfo = async () => {
      const curr = await getLocalCurrencyCode();
      dispatch(changeCurrency(curr))
      dispatch(changeLoading(false));
    };

    fetchLocationInfo();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/about_us' Component={AboutUs} />
          <Route path='/checkout' Component={Checkout} />
          <Route path='/sign_up' Component={SignUp} />
          <Route path='/logIn' Component={LogIn} />
          <Route path='/profile' Component={Profile} />
          <Route path='/:name' Component={() => <Products destination="/category" />} />
          <Route path='/:categoryName/all' Component={() => <ProductsBySubcategories/>} />
          <Route path='/:nameCat/:name' Component={() => <Products destination="/subcategory" />} />
          <Route path='/products' Component={Products} />
          <Route path='/404' Component={Page404} />
          <Route path="/admin" Component={ isUserAdmin ? AdminMenu : Page404}/>
          <Route path="/admin/add-product" Component={isUserAdmin ? AddProductFormPage : Page404}/>
          <Route path="/admin/edit-product/:productId" Component={isUserAdmin ? EditProductFormPage : Page404}/>
          <Route path="/admin/add-combo" Component={isUserAdmin ? ComboFormPage : Page404}/>
          <Route path="/admin/edit-combo/:comboId" Component={isUserAdmin ? () => <ComboFormPage isEditing/> : Page404}/>
          <Route path="/admin/add-drink-mix" Component={isUserAdmin ? DrinkMixFormPage : Page404}/>
          <Route 
            path="/admin/edit-drink-mix/:drinkMixId" 
            Component={isUserAdmin ? () => <DrinkMixFormPage isEditing/> : Page404}
          />
          <Route path="/admin/view-products" Component={isUserAdmin ? AdminViewProducts : Page404}/>
          <Route path="/admin/view-combos" 
            Component={isUserAdmin ? 
            () => 
              <AdminViewProducts 
                actionLinkRoutes={{
                  add: "/admin/add-combo",
                  edit: "/admin/edit-combo/"
                }} 
                fetchLinkRoute="/all-combos"
                typeProduct=""
                collection="combos"
              /> : Page404}/>
            <Route path="/admin/view-drink-mixes" 
              Component={isUserAdmin ? 
              () => 
                <AdminViewProducts 
                  actionLinkRoutes={{
                    add: "/admin/add-drink-mix",
                    edit: "/admin/edit-drink-mix/"
                  }} 
                  fetchLinkRoute="/all-drink-mixes"
                  typeProduct=""
                  collection="drink-mixes"
                /> : Page404}/>
          <Route path="/cart" Component={Cart} />
          <Route path="/products/:id" Component={() => <ProductDetails/>}/>
          <Route path="/combos/:id" Component={() => <ProductDetails/>}/>
          <Route path="/drink-mixes/:id" Component={() => <DrinkMixDetail/>}/>
          <Route path='*' Component={Page404} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App