import React, { useCallback, useEffect, useState } from 'react'
import { NavLink,Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { updateMovies } from '../storeslices/movieslice';
import { get_movie,search_movie } from '../services/movies_servies';
import { getMovies } from './Home';
import { setGenre } from './Home'
import { updateGenre } from '../storeslices/genreslice';
import emitter from '../events/event.jsx';
import { useAuth0 } from '@auth0/auth0-react';



const Nav = () => { 
  const { isAuthenticated, loginWithRedirect, logout,user } = useAuth0();

  const [searchValue,setSearchValue] = useState()
  const movies = useSelector(state => state.movieslist)
  const genre_store = useSelector(state => state.genre_store)
  const watchliststore = useSelector(state => state.watchliststore )
  const dispatch = useDispatch()

  const handlerSearch = async() => {
    try{
      if(searchValue && searchValue.trim().length > 0){
        const res = await search_movie(searchValue.trim());
        if(res[1].ok ){
          console.log(res[0].results,movies)
          if(res[0].results.length > 0 ){
            dispatch(updateMovies(res[0].results))
            console.log(res[0].results,movies)
            emitter.emit('customEvent',res[0].results)

          }
          
       }
      }
      else if( !searchValue || searchValue.trim().length==0){
        const res = await getMovies()
        dispatch(updateMovies(res))
        emitter.emit('customEvent',res)
      }

    }
    catch(e){
      console.log(e)
    }
  }

  const handlerSearch1 = (e) =>{
    setSearchValue(e.target.value)
    console.log(searchValue,"--")
  }

  const logOut = () =>{
    logout()
  }
  
useEffect(()=>{
 
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handlerSearch()

    }
  };
  document.addEventListener('keydown', handleKeyPress);

  if(searchValue && searchValue.trim().length == 0 ){
    handlerSearch()
  }
   return () => {
    document.removeEventListener('keydown', handleKeyPress);
  };

},[searchValue])


  return (
    <div>

  <nav className="bg-gray-800 text-white p-4">
    <div className="container mx-auto flex items-center justify-between  flex-wrap">
      <div className="flex items-center">
        <img src="/src/assets/logo_film.jpeg" alt="Movie Listing App Logo" className="w-8 h-8 mr-2"/>
        <Link to="#" className="text-2xl font-bold">Movie Listing App</Link>
      </div>
      <div className="flex items-center">
        <div className="flex gap-4 items-center flex-wrap mt-4">
       
        <div className="relative">
          <input
            type="text"
            placeholder="Search Movies.."
            value={searchValue}
            onChange={handlerSearch1}
            onDragEnter={handlerSearch}
            className="w-64 py-2 pl-10 pr-10 text-gray-700 rounded-lg shadow focus:outline-none focus:shadow-outline"
          />
        
         
          <svg
            className="h-6 w-6 text-gray-600 absolute top-3 right-4 hover:bg-gray-200 rounded-full "
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            onClick={handlerSearch}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 18h2a8 8 0 100-16 8 8 0 000 16z"
            ></path>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-5.2-5.2"
            ></path>
          </svg>
        </div>
        
        
        <NavLink to="/" className= {({isActive})=> `${isActive ? "text-blue-400":"text-white"}`} >Home</NavLink>
        <NavLink to="/about" className={({isActive})=> `${isActive ? "text-blue-400":"text-white"}`} >About</NavLink>
        <div>
        <NavLink to="/watchlist" className={({isActive})=> `${isActive ? "text-blue-400":"text-white"}`} >Watchlist</NavLink>
        <span className="ml-1 bg-green-400 rounded-full px-2 py-1 text-sm font-bold text-black">{watchliststore.length}</span>
        </div>

        
       
        {false ?
        <span className="text-bglightredcolor flex gap-2 items-center cursor-pointer select-none lowercase " id='optionmenu3'> 
          {""}
          <img style="width: 16px;height:10px;" id="optionmenu6" src='/Vector.png'/> </span>
         :
        <span className="text-bglightredcolor">User not logged-in</span>
    }
               
       
       

        </div>
       { false && <div className=" relative inline-block text-left" id="optionmenu2">
          <div className="absolute right-0 z-10 mt-5 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
            <div className="p-3 flex justify-between"   role="none">
              <span className="text-black " > Logout</span>
            </div>
          </div>
        </div>}       
      </div>
      
    </div>
    
</nav>

    </div>
  )
}

export default Nav
