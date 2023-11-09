import { Button, Container, Typography } from "@mui/material"
import Header from "../components/Header"
import NavigationText from "../components/navText/NavigationText"
import { Link } from "react-router-dom"
import '../assets/styles/404.scss'
import NotFoundAnimation from "../components/404/NotFoundAnimation"

const Page404 = () => {
  return (
    <Container>
      <Header/>
      <NavigationText inactivePath={[{ title: "Home", href: "/" }]} activePath='404 Page' />
      <div className="full-centered-container">
        <NotFoundAnimation/>
        <Typography variant="h1" style={{ fontSize: "4em" }}>NOT FOUND</Typography>
        <Typography marginTop={24} variant="subtitle1">
          You visited Page Not Found
        </Typography>
        <Typography marginBottom={24} variant="h6">
          Refresh your thirst for adventure! Return to the main page and discover the flavor you were looking for.
        </Typography>
        <Button variant="contained" style={{ fontSize: 18 }}><Link to={"/"}>Back to the store</Link></Button>
      </div>
    </Container>
  )
}

export default Page404