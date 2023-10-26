import React, { useEffect, useState } from 'react'
import "./styles/movieDesign.css"
import { useParams, useNavigate} from 'react-router-dom';
import { get_movie } from '../services/movies_servies';

function Movie() {
  const [data, setData] = useState([]);
  const {id} = useParams()
  const navigate = useNavigate()


  const call_api_set_result = async (id) =>{
    const res = await get_movie(id)
    if(res[1].ok){
      console.log(res)
      setData(res[0])
    }
  }
  const backRoute=()=>{
    //history.pop()
    navigate(-1)
  }

  useEffect(()=>{
    call_api_set_result(id)
  },[])

  return (
    <div>
      <button type="button" style={{ float:'right'}} className=" mr-4 m-2 right-0 px-p15 text-sm text-white font-medium py-p10 rounded bg-blue-500 ml-3 ml-auto  bg-bg-blue-500 font-medium rounded text-yellow-50 text-sm px-5 py-2" onClick={backRoute} >Back</button>
      <div className="movie-details">
        <div className="img-container">
          <a href={'https://image.tmdb.org/t/p/original' + data?.backdrop_path}>
            <img src={'https://image.tmdb.org/t/p/original' + data?.backdrop_path} alt={data?.original_title} />
          </a>
        </div>
        <div className="text-container">
          <h1 className="font-bold">{data?.original_title}</h1>
          <p className="overview">{data?.overview}</p>
          <p>
            <span>Release data:</span>
            {data?.release_date} <br />
            <span>Budget:</span> ${data?.budget} <br />
            <span>Rating:</span>
            {data?.vote_average} <br />
            <span>Runtime:</span>
            {data?.runtime}mins <br />
          </p>
        </div>
      </div>

    </div>
  )
}

export default Movie
