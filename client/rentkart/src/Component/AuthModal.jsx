import React, { useState } from 'react'
import Login from './Login'
import Signup from './Signup'
 
export default function AuthModal() {
  const [loginMode, setLogMode] = useState('login')
  return (
    <>
    {loginMode === "login" ? <Login setLogMode ={setLogMode} /> 
    : <Signup setLogMode={setLogMode} />}
    </>
  )
}
