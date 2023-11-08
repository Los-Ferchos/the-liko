import { BrowserRouter, Route, Routes } from "react-router-dom"
import Page404 from "./pages/404"
import Home from "./pages/Home"
import Liquors from "./pages/Liquors"
import SoftDrinks from "./pages/SoftDrinks"
import Extras from "./pages/Extras"
import AboutUs from "./pages/AboutUs"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/liquors' Component={Liquors} />
        <Route path='/soft_drinks' Component={SoftDrinks} />
        <Route path='/extras' Component={Extras} />
        <Route path='/about_us' Component={AboutUs} />
        <Route path='*' Component={Page404} />
      </Routes>
    </BrowserRouter>
  )
}

export default App