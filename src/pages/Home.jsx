import Header from '../components/Header';
import CommingSoon from '../components/ComingSoon';
import { Container, Typography, Grid, TextField, Card, CardContent, Button, IconButton, InputAdornment } from '@mui/material';


function recuperarDeLocalStorage() {
  var valorRecuperado = localStorage.getItem("userData");
  if (valorRecuperado) {
      alert("Valor recuperado de localStorage: " + valorRecuperado);
  } else {
      alert("No hay valor almacenado en localStorage para la clave 'userData'.");
  }
}

const Home = () => {
  const handleLogin = async () => {
    const savedData = localStorage.getItem('userData');
    console.log('Data saved in localStorage:', savedData);
  }
  
  
  return (
    <>
    <Header />    
    <button onClick={handleLogin}> hi </button>
    <CommingSoon />
    </>
  )
}

export default Home
