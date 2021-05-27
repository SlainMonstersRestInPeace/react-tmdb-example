import React from 'react'

import RatingMeter from './RatingMeter'

import { getPosterUrl } from '../util'

import { useSelector } from 'react-redux'

import { Link } from 'react-router-dom'

import styled from 'styled-components'

const MovieItem = styled.div`
border-radius: 4px;

.movie-poster {
  height: 200px;
}
`;

export default ({ movie }) => {
  const config = useSelector(state => state.app.tmdbConfig);
  const posterUrl = getPosterUrl(config, movie.poster, ['w342', 'original']) || '/not-found.png';
  const release = movie.release_date || 'N/A';
  const rating = movie.rating ? `${movie.rating} / 10` : 'N/A';

  function handleImageNotFound(e) {
    if (e.target.src !== "/not-found.png") {
      e.target.src = "/not-found.png";
    } else {
      e.target.src = "";
    }
  }

  return (
    <MovieItem className="card border-0 flex-grow-1">
      <If condition={posterUrl != null}>
        <img src={posterUrl} onError={handleImageNotFound} className="movie-poster card-img-top" />
      </If>
      <div className="card-body position-relative pt-4">
        <RatingMeter rating={movie.rating} />
        <h5 className="card-title movie-title">{movie.title}</h5>
        <h6 className="card-subtitle text-muted movie-release">{release}</h6>
      </div>
      <Link to={`/movie/${movie.id}`} className="stretched-link" />
    </MovieItem>
  );
}