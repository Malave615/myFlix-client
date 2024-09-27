import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import './movie-card.scss';

export const MovieCard = ({ movie, fav, onMovieClick }) => {
  const [isFav, setIsFav] = useState(fav);

  useEffect(() => {
    setIsFav(fav);
  }, [fav]);

  return (
    <Card className="movie-card" onClick={() => onMovieClick(movie)}>
      <Card.Img
        className="movie-card-image"
        variant="top"
        src={movie.imagePath}
        alt={movie.title}
      />
      <Card.Body className="movie-card-content">
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>
          {movie.description}
          {isFav && <span className="fav-badge">Favorite</span>}
        </Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="link">Open</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }).isRequired,
    director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
    }).isRequired,
    featured: PropTypes.bool.isRequired,
    actors: PropTypes.arrayOf(PropTypes.string).isRequired,
    imagePath: PropTypes.string.isRequired,
  }).isRequired,
  fav: PropTypes.bool.isRequired,
  onMovieClick: PropTypes.func.isRequired,
};

export default MovieCard;
