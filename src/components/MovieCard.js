import React from 'react'
import { useHistory } from 'react-router';

import styled from 'styled-components'

import { getPosterUrl, getBackdropUrl } from '../util'

import { useSelector } from 'react-redux'

const MovieCard = styled.div`
.card {
  font-family: "Oswald";
  font-weight: 300;
}

.movie-title {
  font-family: "Open Sans", sans-serif;
  font-weight: bold;
}

.movie-tagline {
  font-weight: 300;
}

.movie-overview {
  font-family: "Lato", sans-serif;
  font-weight: 300;
}

.movie-genres {
  font-weight: 300;
}

.movie-companies {
  font-weight: 300;
}

.movie-release, .movie-revenue, .movie-runtime, .movie-rating {
  font-size: 1.5em;
}

.movie-tagline, .movie-genres, .movie-release, .movie-runtime, .movie-revenue, .movie-rating {
  color: var(--acid-green);
}

.back {
  font-family: 'Oswald', sans-serif;
  font-weight: 700;
}
`;

export default ({ movie }) => {
  const history = useHistory();
  const config = useSelector(state => state.app.tmdbConfig);
  
  const backdropUrl = getBackdropUrl(config, movie.backdrop, 'original');
  const posterUrl = getPosterUrl(config, movie.poster, ['w342', 'original']) || '/not-found.png';
  const backdropStyle = backdropUrl ? { backgroundColor: "rgba(0, 0, 0, 0.8)" } : { backgroundColor: "black" };
  const backgroundStyle = backdropUrl ? { backgroundColor: "rgba(0, 0, 0, 0.8)" } : { backgroundColor: "black" };
  const title = movie.title ? movie.title.toUpperCase(): '';
  const genres = movie.genres ? movie.genres.map(genre => genre.name).join(', ') : '';
  const companies = movie.production_companies ? movie.production_companies.map(company => company.name).join(', ') : '';
  const release = movie.release_date || 'N/A';
  const revenue = movie.revenue ? `US $${movie.revenue}` : 'N/A';
  const runtime = movie.runtime ? `${movie.runtime} min` : 'N/A';
  const rating = movie.rating ? `${movie.rating} / 10` : 'N/A';
  
  function handleImageNotFound(e) {
    if (e.target.src !== "/not-found.png") {
      e.target.src = "/not-found.png";
    } else {
      e.target.src = "";
    }
  }

  function handleClick(e) {
    goBack();
  }

  function goBack() {
    history.goBack();
  }

  return (
    <MovieCard>
      <div className="card overflow-hidden text-white norder-0" style={backdropStyle}>
        <div className="row" style={backgroundStyle}>
          <div className="col-4">
            <If condition={posterUrl != null}>
              <img className="movie-poster d-block w-100" src={posterUrl} onError={handleImageNotFound}/>
            </If>
          </div>
          <div className="col-8 py-3">
            <h2 className="movie-title">{title}</h2>
            <h5 className="movie-tagline">{movie.tagline}</h5>
            <p className="movie-overview mb-5">{movie.overview}</p>
            <h5 className="movie-genres">{genres}</h5>
            <h6 className="movie-companies mb-4">{companies}</h6>
            <div className="row">
              <div className="col-6">
                <h6 className="m-0">Original Release:</h6>
                <p className="movie-release">{release}</p>
              </div>
              <div className="col-6">
                <h6 className="m-0">Box Office:</h6>
                <p className="movie-revenue">{revenue}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <h6 className="m-0">Running Time:</h6>
                <p className="movie-release">{runtime}</p>
              </div>
              <div className="col-6">
                <h6 className="m-0">Vote Average Office:</h6>
                <p className="movie-revenue">{rating}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button type="button" onClick={handleClick} className="btn btn-success col-12 mt-3 back">Go back</button>
    </MovieCard>
  )
}