import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import MovieCard from '../components/MovieCard'

import { getConfig, fetchMovie } from '../redux/reducers/app'

export default ({ id }) => {
  const movie = useSelector(state => state.app.movie || {});
  const tmdbConfig = useSelector(state => state.app.tmdbConfig);

  const dispatch = useDispatch();

  async function created() {
    if (!tmdbConfig) {
      await dispatch(getConfig());
    }

    dispatch(fetchMovie(id));
  }

  useEffect(() => {
    created();
  }, []);

  return (
    <MovieCard movie={movie} />
  )
}