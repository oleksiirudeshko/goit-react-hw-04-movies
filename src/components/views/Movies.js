import React, { Component } from "react";
import { Link } from "react-router-dom";

import Searchbar from "../Searchbar/Searchbar";
import Section from "../Section";

import getQueryParams from "../../utils/get-query-params";
import { FetchApiQuery } from "../../services/FetchApi";

export default class Movies extends Component {
  state = {
    movies: [],
  };

  componentDidMount() {
    const { query } = getQueryParams(this.props.location.search);
    if (query) {
      this.fetchMovies(query);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { query: prevQuery } = getQueryParams(prevProps.location.search);
    const { query: nextQuery } = getQueryParams(this.props.location.search);
    if (prevQuery !== nextQuery) {
      this.fetchMovies(nextQuery);
    }
  }

  fetchMovies = (query) =>
    FetchApiQuery(query)
      .then((movies) => this.setState({ movies }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));

  handleQuery = (query) => {
    this.props.history.push({
      ...this.props.location.pathname,
      search: `query=${query}`,
    });
  };

  render() {
    const { movies, isLoading, error } = this.state;
    const { match } = this.props;

    return (
      <>
        <Searchbar onSubmit={this.handleQuery} />

        <Section>
          {error && <p>Whoops, something went wrong: {error.message}</p>}
          {isLoading && <p>Loading...</p>}
          {movies.length > 0 && (
            <>
              <ul className="MoviesList">
                {movies.map((movie) => (
                  <li className="MoviesListItem" key={movie.id}>
                    <Link
                      to={{
                        pathname: `${match.url}/${movie.id}`,
                        state: { from: this.props.location },
                      }}
                    >
                      <p>{movie.title}</p>
                      <span>{movie.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </Section>
      </>
    );
  }
}
