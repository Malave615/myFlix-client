import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import './movie-card.scss';

export const MovieCard = ({ movie }) => (
  <Card className="movie-card">
    <Card.Img
      className="movie-card-image"
      variant="top"
      src={movie.imagePath}
      alt={movie.title}
    />
    <Card.Body className="movie-card-content">
      <Card.Title>{movie.title}</Card.Title>
      <Card.Text>{movie.description}</Card.Text>
      <Link to={`/movies/${movie.id}`}>
        <Button variant="primary">View Details</Button>
      </Link>
    </Card.Body>
  </Card>
);

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired,
  }).isRequired,
};
