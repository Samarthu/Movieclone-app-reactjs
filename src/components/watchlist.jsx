import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { addToWatchList, removeFromWatchList, watchlist } from '../storeslices/watchlistslice'
import { updateMovies } from '../storeslices/movieslice' 
import { useNavigate } from 'react-router-dom'
import { setWatchListFalse } from '../storeslices/movieslice'

function Watchlist() {

    const movies = useSelector(state => state.watchliststore)
    const genre = useSelector(state => state.genre_store)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const getGenreNames = (genre_list) => genre.filter((d) => genre_list.includes(d.id)).map((d) => d.name).join(",")
    const openMovies = (id) => navigate(`/movie/${id}`)
    const addMovieToWl = (movie) => {
        dispatch(addToWatchList(movie))
        dispatch(setWatchListTrue(movie))
    }

    const removeMovieFromWl = (movie) => {
        dispatch(removeFromWatchList(movie))
        dispatch(setWatchListFalse(movie))
    }


    return (
        <div>
            <div className="container mx-auto mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    { movies.length == 0 ? (<div  className="text-4xl ml-10 mt-10">Movie Not Found In Watchlist</div>) : 

                    ( movies.map((movie, idx) => (
                        <div className="bg-white rounded-lg shadow p-4" key={idx + Math.random()}>
                            <img src={'https://image.tmdb.org/t/p/w500' + movie.poster_path} className="w-full h-48 object-cover rounded-md" alt={movie.title} onClick={() => openMovies(movie.id)} />
                            <h2 className="text-xl font-semibold mt-2">{movie.title}</h2>
                            <p className="text-gray-600">Release Date: {movie.release_date}</p>
                            <p className="text-gray-600">Rating: {movie.vote_average ? movie.vote_average : ''}/10</p>
                            <p className="text-gray-600">Genres: {getGenreNames(movie.genre_ids)} </p>
                           
                                <div className="flex whitespace-nowrap items-center justify-between">
                                    <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg">Added to Watchlist</button>
                                    <div className='flex justify-end'>
                                    <img src="/src/assets/deleteIcon.svg" className="h-10 mt-3" alt="Delete From Watchlist" title="Delete From Watchlist" onClick={() => { removeMovieFromWl(movie) }} />
                                    </div>
                                </div>
                        </div>
                    )))}
                    <p>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Watchlist
