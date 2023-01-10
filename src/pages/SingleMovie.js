import { Container, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import TheatersIcon from '@mui/icons-material/Theaters';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useGlobalContext } from '../../src/context/GlobalState'

function SingleMovie() {
  const { favorites, addToFavorites, removeFromFavorites } = useGlobalContext()
  const { id } = useParams()
  const [movie, setMovie] = useState([])
  const [loading, setLoading] = useState(true)
  const movieId = (id.slice(1))
console.log(movie);
  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_TMDB_KEY}`
    const fetchSingleMovie = async (url) => {
      setLoading(true)
      const res = await fetch(url)
      const data = await res.json()
      setMovie(data)
      setLoading(false)
    }
    fetchSingleMovie(url)
  },[])
  const isFavorite = favorites.find(item => item.id === movie.id)
  const isDisabled = isFavorite
  if (loading) {
    return <Loading />
  }
  return (
    <section className='single-movie-section'>
      <Container>
        <div className="single-movie">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <div className="single-movie-poster">
                <img
                  src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : "https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=2000"}
                  alt={`${movie.title} Poster`}
                />
                <button onClick={() => {
                  addToFavorites(movie)
                }}
                  disabled={isDisabled}
                  className="favorite-btn"
                  style={isDisabled && ({ display: "none" })}
                >
                  <FavoriteIcon />
                </button>
                <button onClick={() => {
                  removeFromFavorites(movie.id)
                }}

                  className="favorite-btn filled"
                  style={isDisabled ? { display: "flex" } : { display: "none" }}
                >
                  <FavoriteIcon />
                </button>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={8}>
              <div className="single-movie-content">
                <h4 className='single-movie-title'>Title: <span>{movie.title}</span></h4>
                <p className='movie-overview'>
                  Overview: <span>{movie.overview}</span>
                </p>
                <p>
                  Popularity: <span>{movie.popularity}</span>
                </p>
                <p>
                  Release date: <span>{movie.release_date}</span>
                </p>
                 <p>Country : {movie.production_countries.map((item)=>{
                   return movie.production_countries.length >1?  <span>{item.name}, </span> : <span>{item.name}</span> 
                 })}</p> 
                 {movie.homepage && (<a target="_blank" href={movie.homepage} className='watch-link' > <TheatersIcon/> <span>Watch</span></a>)}
              </div>
            
            </Grid>
          </Grid>
        </div>
      </Container>
    </section>
  )
}

export default SingleMovie