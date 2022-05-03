import React, { useEffect, useState } from 'react'
import axios from './../../axios'
import YouTube from 'react-youtube'
import movieTrailer from 'movie-trailer'
import { useHover } from '@mantine/hooks';
import { X, CirclePlus, ThumbDown, ThumbUp, PlayerPlay  } from 'tabler-icons-react'

const base_url = "https://image.tmdb.org/t/p/original/";

const Row = ({ title, fetchUrl, isLargeRow }) => {
    const { hovered, ref } = useHover();
    const [movies, setMovies] = useState([]);
    const [trailerPath, setTrailerPath] = useState('');
    const [description, setDescription] = useState('');
    const [movieTitle, setMovieTitle] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]) 


    const opts = {
        playerVars: {
            autoplay: 1,
            modestbranding: 1,
            controls: 0,
        },
    };

    const handleClick = (movie) => {
        if (trailerPath === '') {
            movieTrailer(movie?.name || movie?.title || movie?.original_name || movie?.original_title).then((response) => {
                const path = response.split('?v=')[1];
                setTrailerPath(path);
                document.querySelector('body').style.overflow = 'hidden';
                setDescription(movie?.overview);
                setMovieTitle(movie?.name || movie?.title);
                setOriginal_title(movie?.original_name);
            }).catch((error) => {
                handleError();
                console.log(error);
            })
        } else {
            setTrailerPath('');
            setDescription('');
            setMovieTitle('');
            setOriginal_title('');
            document.querySelector('body').style.overflow = 'auto';
        }
    }

    return (

        <div className={`row-container ${isLargeRow && "first-row"}`}>
            <h2 className="row-title">{title}</h2>
            <div className="row">
                <div className={`row-posters `}>
                    {movies.map((movie, key) => {
                        return  <img key={movie.id} onClick={() => handleClick(movie)} className={`row-poster ${isLargeRow && "row-posterLarge"}`} src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} />
                    })}
                </div>
                {trailerPath && <div className="info__overlay" onClick={() => handleClick(null)}>
                    <div className="info__overlay--contentBox" onClick={(e) => e.stopPropagation()}>
                        <span onClick={() => handleClick(null)} className="info__overlay--btnClose ">
                            <X />
                        </span>
                        <div className="info__overlay--videoBox">
                            <YouTube className="info__overlay--youtube" videoId={trailerPath} opts={opts} />
                            <div className="info__overlay--iconBox">
                                <button className='banner-button bg-white text-black flex rounded-[5px]'>
                                    <PlayerPlay className='text-black mr-[5px] fill-black'/>
                                    Play
                                </button>
                                <span className="info__icon">
                                    <CirclePlus />
                                </span>
                                <span className="info__icon">
                                    <ThumbUp />
                                </span>
                                <span className="info__icon">
                                    <ThumbDown />
                                </span>
                            </div>
                        </div>
                        <div className="info__overlay--text">
                            <h1>{movieTitle}</h1>
                            <p>{description}</p>
                        </div>
                    </div>
                </div>
                }
            </div>
        </div>
    )
}

export const handleError = function() {
    const html = `
        <div class="error">
            <div class="error__text">
                <p class="error__heading">Error:</p>
                <p class="error__description">Can't find trailer, please try another title!</p>
            </div>
        </div>
    `
    const body = document.querySelector('body');
    body.insertAdjacentHTML('afterbegin', html);
    const error = body.querySelector('.error');
    error.classList.add('fade-in');

    setTimeout(function() {
        error.classList.add('fade-out');
        setTimeout(function() {
            error.remove();
        }, 500)
    }, 1000)
}

export default Row