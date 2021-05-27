import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  error: null,
  tmdbConfig: null,
  movie: null,
  suggestions: {
    suggestions: []
  },
  defaultMovieId: 120,
  fetchLoading: false,
  previousRoute: null,
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setPreviousRoute(state, action) {
      state.previousRoute = { ...action.payload }
    },
    fetchStart(state) {
      state.fetchLoading = false;
    },
    fetchEnd(state) {
      state.fetcLoading = true;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setTmdbConfig(state, action) {
      state.tmdbConfig = action.payload;
    },
    setSuggestions(state, action) {
      state.suggestions = action.payload;
    },
    setMovie(state, action) {
      state.movie = action.payload;
    },
    clearMovie(state) {
      state.movie = null;
    },
    clearSuggestions(state) {
      state.suggestions = {
        suggestions: []
      };
    },
  }
});


const {
  setPreviousRoute,
  fetchStart,
  fetchEnd,
  setError,
  setTmdbConfig,
  setSuggestions,
  clearSuggestions,
  setMovie,
  clearMovie,
} = appSlice.actions

import axios from 'axios'

function mapMovie(movie) {
  return {
    id: movie.id,
    genres: movie.genres,
    title: movie.title,
    overview: movie.overview,
    release_date: movie.release_date,
    revenue: movie.revenue,
    rating: movie.vote_average,
    runtime: movie.runtime,
    tagline: movie.tagline,
    backdrop: movie.backdrop_path,
    poster: movie.poster_path,
    production_companies: movie.production_companies
  }
}


function fetchOperation(url, {
  options,
  onSuccess,
  onError,
  transformResponse
}) {
  return async (dispatch, getState) => {
    const opts = options || {};
    const onsuccess = onSuccess || (() => { });
    const errorhandler = onError || (err => { throw err })
    const transform = transformResponse || (res => res);

    let res = {};

    try {
      dispatch(fetchStart());

      res = await axios(url, opts);
      res = transform(res);

      onsuccess(res, { dispatch, getState });
    } catch (err) {
      dispatch(fetchEnd());

      errorhandler(err);
    }

    dispatch(fetchEnd());

    return res;
  };
}

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

function getConfig() {
  return async (dispatch, getState) => {
    const url = `https://api.themoviedb.org/3/configuration?api_key=${TMDB_API_KEY}`;

    return await dispatch(fetchOperation(url, {
      transformResponse: res => res.data,
      onSuccess:  (data, { dispatch, getState }) => {
        dispatch(setTmdbConfig(data))
      }
    }));
  };
}

function fetchMovie(id) {
  return async (dispatch, getState) => {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}`;

    dispatch(clearMovie());

    return await dispatch(fetchOperation(url, {
      transformResponse: res => mapMovie(res.data),
      onSuccess:  (data, { dispatch, getState }) => {
        dispatch(setMovie(data));
      }
    }));
  };
}

function fetchMovies(url, options) {
  return async (dispatch, getState) => {
    dispatch(clearMovie());

    await dispatch(fetchOperation(url, {
      options,
      transformResponse: res => res.data,
      onSuccess: (data, { dispatch, getState }) => {
        const suggestions = getState().app.suggestions.suggestions.concat(data.results.map(mapMovie));

        dispatch(setSuggestions({
          total_pages: data.total_pages,
          total_results: data.total_results,
          page: data.page,
          suggestions 
        }));
      }
    }));
  }
}

function searchMovies(query, options) {
  return async (dispatch, getState) => {
    const page = query.page ? `&page=${query.page}` : '';
    const url = `https://api.themoviedb.org/3/search/movie?query=${query.query}&api_key=${TMDB_API_KEY}${page}`;

    await dispatch(fetchMovies(url, options));
  }
}

function fetchPopularMovies(query, options) {
  return async (dispatch, getState) => {
    const page = query.page ? `&page=${query.page}` : '';
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}${page}`;
  
    await dispatch(fetchMovies(url, options));
  }
}

function fetchNowPlayingMovies(query, options) {
  return async (dispatch, getState) => {
    const page = query.page ? `&page=${query.page}` : '';
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}${page}`;
  
    await dispatch(fetchMovies(url, options));
  }
}

function fetchTopRatedMovies(query, options) {
  return async (dispatch, getState) => {
    const page = query.page ? `&page=${query.page}` : '';
    const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${TMDB_API_KEY}${page}`;

    await dispatch(fetchMovies(url, options));
  }
}

function fetchUpcomingMovies(query, options) {
  return async (dispatch, getState) => {
    const page = query.page ? `&page=${query.page}` : '';
    const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${TMDB_API_KEY}${page}`;

    await dispatch(fetchMovies(url, options));
  }
}

export {
  setPreviousRoute,
  fetchStart,
  fetchEnd,
  setError,
  setTmdbConfig,
  setSuggestions,
  clearSuggestions,
  setMovie,
  clearMovie,
  fetchOperation,
  fetchMovie,
  fetchMovies,
  fetchPopularMovies,
  fetchNowPlayingMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
  searchMovies,
  getConfig
}

export default appSlice.reducer