import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import MovieResults from '../components/MovieResults'
import useCancelToken from '../hooks/useCancelToken'

import { clearSuggestions, searchMovies } from '../redux/reducers/app'

export default ({ query, page }) => {
  const movies = useSelector(state => state.app.suggestions.suggestions);
  const dispatch = useDispatch();

  const lastLoadedPage = useRef(0);
  const source = useCancelToken();

  function clearItems() {
    dispatch(clearSuggestions());
  }

  function searchItems(query, page) {
    const q = { query, page }

    const cancelToken = source.token;
    const options = { cancelToken };

    dispatch(searchMovies(q, options));
  }

  function handleLoadMore() {
    searchItems(query, ++lastLoadedPage.current);
  }
  
  function created() {
    clearItems();
    searchItems(query, 0);
  }

  useEffect(() => {
    created();
  }, []);

  return (
    <MovieResults movies={movies} loadMoreHandler={handleLoadMore} />
  )
}