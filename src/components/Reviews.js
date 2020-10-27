import React, { Component } from 'react';

import { FetchReviews } from '../services/FetchApi';

export default class Reviews extends Component {
  state = {
    reviews: null,
  };

  componentDidMount() {
    FetchReviews(this.props.match.params.movieId)
      .then(rev => this.setState({ reviews: rev.data.results }))
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const reviews = this.state.reviews;

    return reviews ? (
      reviews.length > 0 ? (
        <ul>
          {reviews.map(item => (
            <li key={item.id}>
              <h3>{`Author: ${item.author}`}</h3>
              <p>{item.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews</p>
      )
    ) : null;
  }
}
