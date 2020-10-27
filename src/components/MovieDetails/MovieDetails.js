import React, { Component, Suspense, lazy } from "react";
import { Route, Link } from "react-router-dom";

import routes from "../../routes/routes";
import { FetchMovieDetails } from "../../services/FetchApi";

import s from "./MovieDetails.module.css";

const AsyncCast = lazy(() => import("../Cast"));
const AsyncReviews = lazy(() => import("../Reviews"));

export default class MovieDetails extends Component {
  state = {
    movie: null,
  };

  componentDidMount() {
    FetchMovieDetails(this.props.match.params.movieId)
      .then((movie) => this.setState({ movie: movie.data }))
      .catch((error) => {
        console.log(error);
      });
  }

  handleGoBack = () => {
    const { history, location } = this.props;
    const { state } = location;
    if (state && state.from) {
      return history.push(state.from);
    }
    history.push(routes.home);
  };

  render() {
    const movie = this.state.movie;
    const { match } = this.props;
    const historyState = this.props.history.location.state;

    return (
      <>
        <button className={s.goBackBtn} onClick={this.handleGoBack}>
          go back
        </button>

        {movie !== null && (
          <>
            <div className={s.cover}>
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  className={s.movieImg}
                  alt="img"
                />
              ) : (
                <img
                  src="https://tinyurl.com/y2hp7nzc"
                  className={s.movieImg}
                  alt="img"
                  height="375"
                />
              )}
              <div>
                <p>{movie.original_title}</p>
                <span>{`(${movie.release_date.substr(0, 4)})`}</span>
                <p>{`User score: ${movie.vote_average * 10}%`}</p>
                <p>Overview:</p>
                <p>{movie.overview}</p>
                <p>Genres:</p>
                <p>{movie.genres.map((genre) => genre.name).join(" ")}</p>
              </div>
            </div>
            <hr />

            <div>
              Aditianal information
              <ul className={s.aditianalUl}>
                {historyState ? (
                  <>
                    <Link
                      to={{
                        pathname: `${match.url}/cast`,
                        state: { from: historyState.from },
                      }}
                    >
                      Cast
                    </Link>
                    <Link
                      to={{
                        pathname: `${match.url}/reviews`,
                        state: { from: historyState.from },
                      }}
                    >
                      Reviews
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to={`${match.url}/cast`}>Cast</Link>
                    <Link to={`${match.url}/reviews`}>Reviews</Link>
                  </>
                )}
              </ul>
              <Suspense fallback={<div>Loading...</div>}>
                <Route path={`${match.path}/cast`} component={AsyncCast} />
                <Route
                  path={`${match.path}/reviews`}
                  component={AsyncReviews}
                />
              </Suspense>
            </div>
          </>
        )}
      </>
    );
  }
}
