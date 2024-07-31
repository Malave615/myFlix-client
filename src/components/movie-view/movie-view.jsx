import { useParams, Link } from 'react-router-dom';
import './movie-view.scss';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';

export const MovieView = ({
  movies,
  favMovies,
  onAddToFavorites,
  onRemoveFromFavorites,
}) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);
  const [isFav, setIsFav] = useState(favMovies?.includes(movieId) || false);

  if (!movie) {
    return <div>Movie not found</div>;
  }

  const handleFavoriteClick = () => {
    setIsFav(!isFav);
    if (isFav) onRemoveFromFavorites(movieId);
    else onAddToFavorites(movieId);
  };

  return (
    <Card className="h-100 w-100">
      <Container>
        <Row xs={1} sm={1} md={2}>
          <Col>
            <img src={movie.image} alt={movie.Title} />
          </Col>
          <Col>
            <Card.Body>
              <Card.Title>{movie.Title}</Card.Title>
              <p>
                <strong>Description:</strong>
                {movie.Description}
              </p>
              <p>Genre: {movie.genre.name}</p>
              <p>
                Director:{' '}
                {movie.director.map((director, i) => (
                  <span key={i}>{director.Name}&nbsp;</span>
                ))}
              </p>
              <Button onClick={() => handleFavoriteClick()}>
                {!isFav ? 'Add to favorites' : 'Remove from favorites'}
              </Button>

              <Link to="/">
                <Button>Back</Button>
              </Link>
            </Card.Body>
          </Col>
        </Row>
      </Container>
    </Card>
  );
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      genre: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
      director: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
        }),
      ).isRequired,
    }),
  ).isRequired,
  favMovies: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAddToFavorites: PropTypes.func.isRequired,
  onRemoveFromFavorites: PropTypes.func.isRequired,
};
