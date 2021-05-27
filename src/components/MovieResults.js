import React from 'react'

import { v4 as uuid } from 'uuid'
import MovieItem from './MovieItem'

import styled from 'styled-components'

const LoadMoreButton = styled.button`
font-family: 'Oswald', sans-serif;
font-weight: 700;

font-size: 1.15em;
`;

export default ({ movies, loadMoreHandler }) => {
  return (
    <div className="movie-results">
      <div className="d-flex flex-wrap justify-content-start items-container">
        {
          movies.map((movie, i) => {
            return ( 
              <div key={uuid()} className="item d-flex flex-column mb-4">
                <MovieItem movie={movie} />
              </div>
            );
          })
        }
      </div>
      <LoadMoreButton type="button" className="btn btn-success load-more col-12 mb-3" onClick={loadMoreHandler} >
        Load More
      </LoadMoreButton>
    </div>
  )
}