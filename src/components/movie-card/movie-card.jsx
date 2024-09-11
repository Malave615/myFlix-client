import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const MovieCard = ({ movie, fav }) => {
  const [isFav, setIsFav] = useState(fav);

  useEffect(() => {
    setIsFav(fav);
  }, [fav]);

  return (
    <Card className="h-100">
      <Card.Img
        className="h-100"
        variant="top"
        src={movie.ImagePath}
        alt={movie.Title}
      />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>
          {movie.Description}
          {isFav && <span className="fav-badge">Favorite</span>}
        </Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button variant="link">Open</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }).isRequired,
    Director: PropTypes.shape({
      name: PropTypes.string.isRequired,
      bio: PropTypes.string.isRequired,
      birth: PropTypes.string.isRequired,
    }).isRequired,
    Featured: PropTypes.bool.isRequired,
    Actors: PropTypes.arrayOf(PropTypes.string).isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
  fav: PropTypes.bool.isRequired,
};

export default MovieCard;
