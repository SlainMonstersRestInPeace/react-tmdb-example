import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import MovieResults from '../components/MovieResults'
import useCancelToken from '../hooks/useCancelToken'

import { clearSuggestions, fetchUpcomingMovies } from '../redux/reducers/app'

export default () => {
  const movies = useSelector(state => state.app.suggestions.suggestions);
  const dispatch = useDispatch();

  const lastLoadedPage = useRef(0);

  const source = useCancelToken();

  function clearItems() {
    dispatch(clearSuggestions());
  }

  function fetchItems() {
    const cancelToken = source.token;
    const options = { cancelToken }

    dispatch(fetchUpcomingMovies({
      page: ++lastLoadedPage.current
    }, options));
  }

  function handleLoadMore() {
    fetchItems();
  }
  
  function created() {
    clearItems();
    fetchItems();
  }

  useEffect(() => {
    created();

    return function () {
      source.cancel();
    }
  }, []);

  return (
    <MovieResults movies={movies} loadMoreHandler={handleLoadMore} />
  )
}