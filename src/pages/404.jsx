import { Button, Container, Typography } from "@mui/material"
import NavigationText from "../components/navText/NavigationText"
import { Link } from "react-router-dom"
import '../assets/styles/404.css'
import bottle from '../assets/images/bottle.jpg'
import useWindowSize from "../components/hooks/useWindowSize"
import NewHeader from "../components/header/Header"

/**
 * Functional component representing the 404 Not Found page.
 * This component is displayed when a user navigates to a non-existing page.
 * @component
 * @returns {JSX.Element} Rendered component
 */
const Page404 = () => {
  const { width, height } = useWindowSize();
  return (
    <Container>
      <NewHeader/>
      <NavigationText inactivePath={[{ title: "Home", href: "/" }]} activePath='404 Page' />
      <div className="full-centered-container">
        <div className="page-404-container">
          <img className="bottle" src={bottle} alt=""/>
          <Typography variant={width < 768 ? "h2" : "h1"} marginTop={10} className="title-404">404 Not Found</Typography>

          <Typography marginTop={10} marginBottom={16} variant={width < 768 ? "subtitle1" : "h6"}>
            Return to the main page and find your new favorite drink
          </Typography>
          <Button variant="contained" style={{ fontSize: 18 }}><Link to={"/"}>Back to the store</Link></Button>
        </div>
      </div>
    </Container>
  )
}

export default Page404