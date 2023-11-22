import React from 'react'
import { Container } from '@mui/material'
import HeaderSimple from '../components/header/HeaderSimple'
import SignUpForm from '../components/signUp/SignUpForm'
import '../assets/styles/signUpForm.css'

function SignUp() {

  return (
    <Container>
        <HeaderSimple/>
        <div className='main-container'>
            <SignUpForm/>
        </div>
    </Container>
  
  )
}

export default SignUp