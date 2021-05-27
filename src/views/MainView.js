import React from 'react'
import { useSelector } from 'react-redux'

import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

import Header from '../components/Header'

import ViewMovie from './ViewMovie'
import SearchMovies from './SearchMovies'
import PopularMovies from './PopularMovies'
import NowPlayingMovies from './NowPlayingMovies'
import UpcomingMovies from './UpcomingMovies'
import TopRatedMovies from './TopRatedMovies'

import NotFound from './NotFound'

import { useLocation, useParams } from 'react-router-dom'

import queryString from 'query-string'

const ViewMovieComponent = () => {
  const { id } = useParams();

  return (
    <ViewMovie id={+id} />
  );
}

const SearchMoviesComponent = () => {
  const location = useLocation();
  const urlParams = queryString.parse(location.search, { parseNumbers: true });

  const query = urlParams.q;
  const page = urlParams.pgn - 1;

  return (
    <SearchMovies query={query} page={page} />
  );
}

export default () => {
  const defaultMovieId = useSelector(state => state.app.defaultMovieId);

  return (
    <div className="container-sm">
      <Header />
      <Switch>
        <Redirect exact from='/' to='/popular' />
        <Redirect exact from="/movie" to={`/movie/${defaultMovieId}`} />
        <Route exact path="/movie/:id" component={ViewMovieComponent} />
        <Route exact path="/search" component={SearchMoviesComponent} />
        <Route exact path="/popular" component={PopularMovies} />
        <Route exact path="/now-playing" component={NowPlayingMovies} />
        <Route exact path="/upcoming" component={UpcomingMovies} />
        <Route exact path="/top-rated" component={TopRatedMovies} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}