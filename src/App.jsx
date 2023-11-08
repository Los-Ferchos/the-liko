import { BrowserRouter, Route, Routes } from "react-router-dom"
import Page404 from "./pages/404"
import Home from "./pages/Home"
import AboutUs from "./pages/AboutUs"


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/aboutUs' Component={AboutUs} />
        <Route path='*' Component={Page404} />
      </Routes>
    </BrowserRouter>
  )
}

export default App