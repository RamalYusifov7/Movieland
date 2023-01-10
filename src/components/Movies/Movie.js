import React from 'react'
import "./movies.scss"
import { Box, Container, Grid } from '@mui/material'
import { Link } from 'react-router-dom'
import StarIcon from '@mui/icons-material/Star';
import { useGlobalContext } from '../../context/GlobalState'
import FavoriteIcon from '@mui/icons-material/Favorite';
function Movie({ movie }) {

  const { favorites, addToFavorites, removeFromFavorites } = useGlobalContext()
  const isFavorite = favorites.find(item => item.id === movie.id)
  const isDisabled = isFavorite
  return (
    <Grid item xs={6} sm={4} md={3} >
      <Box className='movie-card'>
        <Link to={`/movies/:${movie.id}`}>
          <div className="movie-poster">
            <img
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : "https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=2000"}
              alt={`${movie.title} Poster`}
            />
            <div className="movie-content">
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <h4 className='movie-title'>{movie.title}</h4>
                <div className='movie-vote_average'><StarIcon />{movie.vote_average
                }</div>
              </Box>
            </div>
          </div>
        </Link>
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
      </Box>

    </Grid>
  )
}

export default Movie