let api_key =import.meta.env.VITE_API_KEY


const proces_response = async (data) => [await data.json(),data]

export const get_movies = async ()=>{
    console.log(api_key)
    const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}`)
    return await proces_response(res) 
}

export const get_movie = async (id)=>{
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}`)
    return await proces_response(res) 
}

export const search_movie = async (key)=>{
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${key}&page=1&include_adult=false`)
    return await proces_response(res) 
}
export const get_genre = async (key)=>{
    const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`)
    return await proces_response(res) 
}