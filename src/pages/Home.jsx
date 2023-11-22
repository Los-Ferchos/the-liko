import { Container } from '@mui/material';
import CommingSoon from '../components/ComingSoon';
import NewHeader from '../components/header/Header';
import Footer from '../components/footer/Footer';

const Home = () => {
  return (
    <>
      <Container>
      <NewHeader />

        <CommingSoon />
      </Container>
      <Footer />

    </>
  )
}

export default Home
