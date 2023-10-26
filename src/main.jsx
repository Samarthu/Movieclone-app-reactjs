import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import  {Nav,Home,Singup,Login,About,Movie,Unauthorised,Watchlist} from "./components"
import { get_movies } from './services/movies_servies.jsx'
import { getMovies } from './components/Home.jsx'
import { Provider } from 'react-redux'
import {store } from "./stores/store.js"
import { Auth0Provider } from '@auth0/auth0-react';




const router = createBrowserRouter([{
  path:"/",
  element:<App/>,
  children:[
    {
      path:"",
      element:< Home/>,

    },
    {
      path:"/home",
      element:< Home/>,

    },
    {
      path:"unuthorised",
      element:<Unauthorised/>
    },
    {
      path:"about",
      element:<About/>
    },
    {
      path:"watchlist",
      element:<Watchlist/>
    },
    {
      path:"movie/:id",
      element:<Movie/>
    },
    {
      path:"login",
      element:<Login/>
    },
    {
      path:"singup",
      element:<Singup/>
    }
  ]
}

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
   </Provider>
  </React.StrictMode>,
)
