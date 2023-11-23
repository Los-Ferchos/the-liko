import React from 'react'
import { Container } from '@mui/material'
import HeaderSimple from '../components/header/HeaderSimple'
import SignUpForm from '../components/signUp/SignUpForm'
import '../assets/styles/signUpForm.css'

/**
 * A React component that displays a sign-up form for new users to create an account.
 *
 * @return {React.Component} A React component representing the sign-up page.
 */
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