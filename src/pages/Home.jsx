import CommingSoon from '../components/ComingSoon';
import NewHeader from '../components/header/Header';

const Home = () => {
  const handleLogin = async () => {
    const savedData = localStorage.getItem('userData');
    console.log('Data saved in localStorage:', savedData);
  }
  
  
  return (
    <>
    <NewHeader />
    <CommingSoon />
    </>
  )
}

export default Home
