import { Container, Grid } from '@mui/material';
import React from 'react';
import Movie from '../components/Movies/Movie';
import { useGlobalContext } from '../context/GlobalState';
function Favorites() {
  const { favorites } = useGlobalContext()
  return (
    <section className='favorites-sec'>
      <Container className='container'>
        {favorites.length > 0 ? (
          <Grid container spacing={2}>
            {favorites.map(movie => {
              return <Movie key={movie.id} movie={movie} />
            })}
          </Grid>
        ) : <div className='no-movie'
              >No movie was found in your favorites list
        </div>}
      </Container>
    </section>
  )
}

export default Favorites