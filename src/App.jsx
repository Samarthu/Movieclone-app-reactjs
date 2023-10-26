import { useEffect, useState } from 'react'

import { Nav,Footer, Login } from './components'
import './App.css'
import { Outlet } from 'react-router-dom'
import { setGenre } from './components/Home'
import genreslice from './storeslices/genreslice'
import { useDispatch,useSelector } from 'react-redux'
import { updateGenre } from './storeslices/genreslice'

import { useAuth0 } from '@auth0/auth0-react';

function App() {
  const [count, setCount] = useState(0)
  const dispatch = useDispatch()
  const genre_store = useSelector(state => state.genre_store)
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const setGenrs = async () => {
      if(genre_store.length == 0){
        let res = await setGenre()
        console.log(res)
        dispatch(updateGenre(res))
      }else{
        console.log(genre_store,"==")
      }
  }
  useEffect(()=>{
    ;(async()=>{
      await setGenrs()
    })()

  },[])

  return (
    <>
    <Nav/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default App
