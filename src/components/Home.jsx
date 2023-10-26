import React, { useEffect, useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { get_genre, get_movies } from '../services/movies_servies'
import { useDispatch, useSelector } from 'react-redux'
import { updateMovies, setWatchListFalse, setWatchListTrue, updateMoviesByFilters } from '../storeslices/movieslice'
import { genre, updateGenre } from '../storeslices/genreslice'
import { Link } from 'react-router-dom'
import { addToWatchList, removeFromWatchList, watchlist } from '../storeslices/watchlistslice'
import { setDisplayYear, setDisplayRating, setDisplayGenre, setSelectedGenre, setSelectedRating, setSelectedYear } from '../storeslices/filterSlice'
import emitter from '../events/event.jsx'

function Home() {
    console.log('setMates')
    //const movies_d = useLoaderData()
    const movies = useSelector(state => state.movieslist)
    const genre_store = useSelector(state => state.genre_store)
    const watchliststore = useSelector(state => state.watchliststore)
    const [backupMovie, setbackupMovie] = useState([])
    const [displayFilterStore, setdisplayFilterStore] = useState({})
    //const displayFilterStore = useSelector(state => state.filterstore.display)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const load_movies = async (movies) => {
        console.log('hited', "load movies")
        let movie_d = []
        if (movies.length == 0) {
            movie_d = await getMovies()

        } else {
            movie_d = movies
        }
        setData(movie_d)
    }


    const setData = async (movie) => {
        if (movies.length > 0) {
            console.log(watchliststore)
            let ids = watchliststore.map((moie) => moie.id)
            movie = movie.map((d) => {
                if (ids.includes(d.id)) {
                    return { ...d, watchlist: 1 }
                }
                return d
            })
        }
        dispatch(updateMovies(movie))
        setbackupMovie(movie)
        await getFilters(movie)
    }

    const getFilters = async (movie_list) => {


        if (Object.keys(displayFilterStore).length == 0) {


            let ge_rs = await setGenre()
            let year_filters_list = new Set()
            let rating_filters_list = new Set()
            let genre_filter_list = new Set()
            movie_list.forEach((d) => {
                if (d.release_date.split("-")[0].length > 0) year_filters_list.add(d.release_date.split("-")[0])
                if (parseInt(d.vote_average) > 0) rating_filters_list.add(parseInt(d.vote_average))
                if (d.genre_ids.length > 0) ge_rs.filter((gs) => d.genre_ids.includes(gs.id)).forEach((d) => genre_filter_list.add(d))
            })

            year_filters_list = [...year_filters_list].sort().map((d) => {
                let obj = { name: d, is_selected: false }
                // if (selectedFilterStore.year_filter.includes(d)) {
                //     obj.is_selected = true;
                // }
                return obj
            })
            rating_filters_list = [...rating_filters_list].sort().map((d) => {
                let obj = { name: d, is_selected: false }
                // if (selectedFilterStore.rating_filter.includes(d)) {
                //     obj.is_selected = true;
                // }
                return obj
            })
            // dispatch(setDisplayGenre([...genre_filter_list]))
            // dispatch(setDisplayRating(rating_filters_list))
            // dispatch(setDisplayYear(year_filters_list))
            let obj = {
                genre_filter: [...genre_filter_list],
                rating_filter: rating_filters_list,
                year_filter: year_filters_list
            };
            console.log('hited', obj)
            setdisplayFilterStore(obj);
            // setTimeout(()=>{
            //     console.log(displayFilterStore,"00")
            // },1000)
        }
    }

    const getGenreNames = (genre_list) => genre_store.filter((d) => genre_list.includes(d.id)).map((d) => d.name).join(",")
    const openMovies = (id) => navigate(`/movie/${id}`)

    const addMovieToWl = (movie) => {
        dispatch(addToWatchList(movie))
        dispatch(setWatchListTrue(movie))
    }

    const removeMovieFromWl = (movie) => {
        dispatch(removeFromWatchList(movie))
        dispatch(setWatchListFalse(movie))
    }
    // const setGenrs = async () => {
    //     if(genre_store.length == 0){
    //       let res = await setGenre()
    //       console.log(res)
    //       dispatch(updateGenre(res))
    //     }else{
    //       console.log(genre_store,"==")
    //     }
    // }

    const getSelected = (arr) => arr.filter(d => d.is_selected == true)

    const toggleSelection = (genre, value) => {
        //value == 1 : Genre
        // value == 2 : Year
        //value == 3 : rating
        let filtersCopy = { ...displayFilterStore }
        if (value == 1) {
            let idx = filtersCopy.genre_filter.findIndex((v) => v == genre)
            filtersCopy.genre_filter[idx] = { ...filtersCopy.genre_filter[idx], is_selected: !filtersCopy.genre_filter[idx].is_selected }
        }
        else if (value == 2) {
            let idx = filtersCopy.year_filter.findIndex((v) => v == genre)
            filtersCopy.year_filter[idx] = { ...filtersCopy.year_filter[idx], is_selected: !filtersCopy.year_filter[idx].is_selected }
        } else {
            let idx = filtersCopy.rating_filter.findIndex((v) => v == genre)
            filtersCopy.rating_filter[idx] = { ...filtersCopy.rating_filter[idx], is_selected: !filtersCopy.rating_filter[idx].is_selected }
        }
        console.log(filtersCopy)
        setdisplayFilterStore(filtersCopy)
        let selectedGenre = getSelected(filtersCopy.genre_filter)
        selectedGenre = selectedGenre.length ? selectedGenre.map((g) => g.id) : []
        let selectedYear = getSelected(filtersCopy.year_filter)
        selectedYear = selectedYear.length ? selectedYear.map((d) => d.name) : []
        let selectedRating = getSelected(filtersCopy.rating_filter)
        selectedRating = selectedRating.length ? selectedRating.map((d) => parseInt(d.name)) : []
        console.log(backupMovie, selectedGenre, selectedYear, selectedRating, displayFilterStore)
        dispatch(updateMoviesByFilters({ backup: backupMovie, genre_filter: selectedGenre, year_filter: selectedYear, rating_filter: selectedRating }))
    }
    useEffect(() => {
        ; (async () => {
            await load_movies(movies)
        })()
        //setData(movies_d)

        const handleEvent = (data) => {
            console.log('hied by event', movies)
            setbackupMovie(data)
            getFilters(data)
        }
        emitter.on('customEvent', handleEvent)

        return () => {
            emitter.off('customEvent', handleEvent);
        }


    }, [])
    return (
        <div>
            <div className="container mx-auto mt-8">
                <div class="flex items-center gap-2 mb-5 flex-wrap px-4">
                    <h2 class="whitespace-nowrap "> Genre : </h2>

                    {displayFilterStore.genre_filter?.map((genre) => (

                        <button key={genre.id + Math.random()}
                            type="button"
                            className={`border-2 whitespace-nowrap rounded-lg ${!genre.is_selected ? "bg-white" : "bg-green-600"}  p-2`}
                            onClick={() => toggleSelection(genre, 1)}
                        >
                            {genre.name}
                        </button>
                    ))}

                </div>
                <div class="flex items-center gap-2 mb-5 flex-wrap px-4">
                    <h2 class="whitespace-nowrap "> Year : </h2>

                    {displayFilterStore?.year_filter?.map((year) => (

                        <button key={year.name + Math.random()}
                            type="button"
                            className={`border-2 whitespace-nowrap rounded-lg ${!year.is_selected ? "bg-white" : "bg-green-600"} p-2`}
                            onClick={() => toggleSelection(year, 2)}
                        >
                            {year.name}
                        </button>
                    ))}

                </div>
                <div class="flex items-center gap-2 mb-5 flex-wrap px-4">
                    <h2 class="whitespace-nowrap "> Rating : </h2>

                    {displayFilterStore?.rating_filter?.map((rating) => (

                        <button key={rating.name + Math.random()}
                            type="button"
                            className={`border-2 whitespace-nowrap rounded-lg ${!rating.is_selected ? "bg-white" : "bg-green-600"} p-2`}
                            onClick={() => toggleSelection(rating, 3)}
                        >
                            {rating.name}
                        </button>
                    ))}

                </div>




                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {(movies.length == 0) ? (<div className="text-4xl ml-10 mt-10">Movie Not Found</div>) :
                        (movies.map((movie, idx) => (
                            <div className="bg-white rounded-lg shadow p-4" key={idx + Math.random()}>
                                <img src={'https://image.tmdb.org/t/p/w500' + movie.poster_path} className="w-full h-48 object-cover rounded-md" alt={movie.title} onClick={() => openMovies(movie.id)} />
                                <h2 className="text-xl font-semibold mt-2">{movie.title}</h2>
                                <p className="text-gray-600">Release Date: {movie.release_date}</p>
                                <p className="text-gray-600">Rating: {movie.vote_average ? movie.vote_average : ''}/10</p>
                                <p className="text-gray-600">Genres: {getGenreNames(movie.genre_ids)} </p>
                                {!movie?.watchlist ? (
                                    <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={() => { addMovieToWl(movie) }} >Add to Watchlist</button>
                                ) : (
                                    <div className="flex whitespace-nowrap items-center justify-between">
                                        <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg">Added to Watchlist</button>
                                        <div className='flex justify-end'>
                                        <img src="/src/assets/deleteIcon.svg" className="h-10 mt-3" alt="Delete From Watchlist" title="Delete From Watchlist" onClick={() => { removeMovieFromWl(movie) }} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        )))
                    }
                    <p>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Home

export const getMovies = async () => {
    let rs = await get_movies()
    console.log(rs)
    return rs[0].results
}

export const setGenre = async () => {
    let genres_resp = await get_genre()
    return genres_resp[0].genres.map((d) => { d['is_selected'] = false; return d })
}
