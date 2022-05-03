import React, { useEffect, useState } from 'react'
import axios from './../../axios'
import requests from './../../requests';
import { PlayerPlay, InfoCircle } from 'tabler-icons-react'

const Banner = () => {
    console.log('url' + process.env.REACT_APP_API_KEY)
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(request.data.results[
                Math.floor(Math.random() * request.data.results.length - 1)
            ]);

            return request;
        }

        fetchData();
    }, []);

    console.log(movie);

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n -1) + "..." : str;
    }

  return (
    <div 
        className='banner'
        style={{
            backgroundSize: "cover",
            backgroundImage: `url(
                "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
            )`,
            backgroundPosition: "center center",
        }}
    >
        <div className='banner-contents'>
            <h1 className='banner-title'>
                {movie?.title || movie?.name || movie?.original_name}
            </h1>
            <h1 className='banner-description'>
                {truncate(movie?.overview, 150)}
            </h1>
            <div className='banner-buttons flex'>
                <button className='banner-button bg-white text-black flex rounded-[5px]'>
                    <PlayerPlay className='text-black mr-[5px] fill-black'/>
                    Play
                </button>
                <button className='banner-button flex rounded-[5px]'>
                    <InfoCircle className='mr-[5px]'/>
                    More Info
                </button>
            </div>
        </div>
        <div 
            className='banner-fadeBottom' 
            style={{
                backgroundImage: "linear-gradient(180deg, transparent, rgba(37, 37, 37, 0.61), #111)"
            }}
        ></div>
    </div>
  )
}

export default Banner