import { Box, Container } from '@mui/material'
import React, { useState } from 'react'
import "./Searchbar.scss"
import { useGlobalContext } from '../../context/GlobalState'
function Searchbar() {
  const { setQuery } = useGlobalContext()
  return (
    <section className="searchbar-section">
      <Container>
        <form action="" onSubmit={(e) => e.preventDefault()}>
          <Box className='search-wrapper' >
            <input className='input input-regular '
              type="text"
              placeholder='Search for movies'
              onChange={(e) => setQuery(e.target.value)}
            />
          </Box>
        </form>
      </Container>
    </section>
  )
}

export default Searchbar