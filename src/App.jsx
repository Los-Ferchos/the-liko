import { BrowserRouter, Route, Routes } from "react-router-dom"
import Page404 from "./pages/404"
import Home from "./pages/Home"
import ReduxExample from "./poc/redux/Redux"
import ProductPage from "./poc/products/ProductsPage"
import AdminPanel from "./poc/adminpanel/AdminPanel"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/redux' Component={ReduxExample} />
        <Route path='/products' Component={ProductPage} />
        <Route path='/admin' Component={AdminPanel} />
        <Route path='*' Component={Page404} />
      </Routes>
    </BrowserRouter>
  )
}

export default App