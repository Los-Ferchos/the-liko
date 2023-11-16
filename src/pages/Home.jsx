import { Container } from '@mui/material';
import CommingSoon from '../components/ComingSoon';
import NewHeader from '../components/header/Header';

const Home = () => {
  return (
    <>
      <NewHeader />
      <Container>
        <CommingSoon />
      </Container>
    </>
  )
}

export default Home
