import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';


function Login() {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div className='text-center'>
      <button className='m-4 h-2 bg-green-600  p-3' onClick={()=> loginWithRedirect()}> LogIn</button>
    </div>
  )
}

export default Login
