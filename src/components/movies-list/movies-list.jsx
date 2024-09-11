import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { MovieCard } from '../movie-card/movie-card';
import MoviesFilter from '../movies-filter/movies-filter';

const MoviesList = ({ movies, filter }) => {
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(filter.trim().toLowerCase()),
  );

  return (
    <>
      <Row>
        <Col>
          <MoviesFilter />
        </Col>
      </Row>
      <Row>
        {filteredMovies.length === 0 ? (
          <Col>The list is empty!</Col>
        ) : (
          filteredMovies.map((movie) => (
            <Col className="mb-4" key={movie.id} md={3}>
              <MovieCard movie={movie} />
            </Col>
          ))
        )}
      </Row>
    </>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.number.isRequired,
      Title: PropTypes.string.isRequired,
    }),
  ).isRequired,
  filter: PropTypes.string.isRequired,
};

export default MoviesList;
