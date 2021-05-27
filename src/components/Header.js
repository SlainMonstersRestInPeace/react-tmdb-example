import React from 'react'

import SearchMovieForm from './SearchMovieForm'
import Navigation from './Navigation'

import { Link } from 'react-router-dom'

import styled from 'styled-components'

const Logo = styled.img`
  width: 154px;
  height: 20px;
`;

export default () => {
  return (
    <header className="site-header d-flex flex-row align-items-center mb-3">
      <Link to="/">
        <Logo className="tmdb-logo mr-5" src="/tmdb-logo-long.svg" />
      </Link>
      <SearchMovieForm />
      <Navigation />
    </header>
  );
}
