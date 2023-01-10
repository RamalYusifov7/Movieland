import { Container, Grid } from '@mui/material'
import Movie from '../Movies/Movie'
import React from 'react'
import "./movies.scss"
import "./movies-mobile.scss";
import { useGlobalContext } from '../../context/GlobalState'
import Loading from '../Loading'
function Movies() {
  const { loading, movies } = useGlobalContext()
  if (loading) {
    return <Loading />
  }
    return (
      <section className='movies-section'> (
        <Container>
          {movies.length > 0 ? (
            <Grid container spacing={2}>
              {movies.map((movie) => {
                return (
                  <Movie key={movie.id} movie={movie} />
                )
              })}
            </Grid>
          ) : <div className='no-movie'>
            No movie matched your search
          </div>}
        </Container>
        )
      </section>
    )
}

export default Movies