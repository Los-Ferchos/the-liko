import { Button, Container, Typography } from "@mui/material"
import Header from "../components/Header"
import NavigationText from "../components/navText/NavigationText"
import { Link } from "react-router-dom"

const Page404 = () => {
  return (
    <Container>
      <Header/>
      <NavigationText inactivePath={[{ title: "Home", href: "/" }]} activePath='404 Page' />
      <div className="full-centered-container">
        <Typography variant="h1" style={{ fontSize: "6.5em", fontWeight: "500" }}>404 Not Found</Typography>
        <Typography variant="subtitle1">You visited Page Not Found, you may want to go back to homepage</Typography>
        <Button variant="contained"><Link>Back to HomePage</Link></Button>
      </div>
    </Container>
  )
}

export default Page404