import React from 'react'

import $ from 'jquery'
import Bloodhound from 'corejs-typeahead'

import styled from 'styled-components'
import { useRef, useEffect } from 'react'

import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { getConfig, fetchMovie } from '../redux/reducers/app'
import { useHistory } from 'react-router'

const SearchMovieForm = styled.form`
.button-search {
  background: linear-gradient(to right, var(--emerald-green), var(--azure));
  font-weight: 700;
  font-family: "Lato", sans-serif;
  border-radius: 80px;
}

input[type=text] {
  outline: none;
  border: none;
  border-bottom: 1px solid white;
  background: transparent;
  padding: 8px 16px;
  color: white;
  font-family: "Lato", sans-serif;
  width: 300px;
}

.search-input {
  overflow: hidden;
  border-radius: 80px;
  background: white;
}
`;

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const tmdbUrl = `https://api.themoviedb.org/3/search/movie?query=%QUERY&api_key=${TMDB_API_KEY}`;

export default () => {
  const bh = useRef(null);
  const selectedItem = useRef(null);
  const tmdbConfig = useSelector(state => state.app.tmdbConfig);

  const history = useHistory();

  const { register, getValues } = useForm({
    defaultValues: {
      title: ''
    }
  });

  const dispatch = useDispatch();

  async function submitForm() {
    $('.typeahead').typeahead('close');

    if (selectedItem.current) {
      const id = selectedItem.current.id;

      await getMovie(id);

      history.push(`/movie/${id}`);
    } else {
      history.push(`/search?q=${getValues('title')}`);
    }
  }

  function fetchConfig() {
    dispatch(getConfig());
  }

  function getMovie(id) {
    dispatch(fetchMovie(id));
  }

  function initTypeahead() {
    bh.current = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.whitespace,
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      remote: {
        wildcard: "%QUERY",
        url: tmdbUrl,
        filter(res) {
          return res.results.map(item => ({
            title: item.original_title,
            id: item.id
          }))
        }
      }
    });

    $('.typeahead').typeahead({
      hint: true,
      highlight: true,
      minLength: 2
    },
    {
      name: 'movies',
      source: bh.current.ttAdapter(),
      display: suggestion => suggestion.title
    });

    $('.typeahead').on('typeahead:select', (jQ, suggestion) => {
      selectedItem.current = suggestion;

      $('#search').submit();
      $('.typeahead').typeahead('close');
    });

    $('.typeahead').on('typeahead:cursorchange', (jQ, suggestion) => {
      selectedItem.current = suggestion;

      console.log('hi')
    });

    $('.typeahead').on('typeahead:autocomplete', (jQ, suggestion) => {
      selectedItem.current = suggestion;
    });

    $('.typeahead').on('input', e => {
      selectedItem.current = null;
    });

    $('.typeahead').on('click', function(e) {
      e.target.select();
    });
  }

  function mounted() {
    if (!tmdbConfig) {
      fetchConfig();
    }

    $('#search').on('submit', e => {
      e.preventDefault();

      submitForm();
    });

    initTypeahead();
  }

  useEffect(() => {
    mounted();
  }, [])

  return (
    <SearchMovieForm className="d-flex flex-row align-items-center mr-3" id="search">
      <input className="typeahead" type="text" placeholder="Search Movie Titles..." required aria-label="Search Title" {...register('title')}/>
      <div className="mr-3" />
      <button type="submit" className="btn text-white button-search px-4">Search</button>
    </SearchMovieForm>
  )
}