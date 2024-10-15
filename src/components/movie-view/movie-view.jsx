import { useParams, Link, useNavigate } from 'react-router-dom';
import './movie-view.scss';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';

export const MovieView = (props) => {
  const { movies, user, FavMovies, onAddToFavorites, onRemoveFromFavorites } =
    props;
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const foundMovie = movies.find((m) => m.id === movieId);
    setMovie(foundMovie);
    if (foundMovie) {
      setIsFav(user.FavMovies.includes(movieId)); // Check if movie is in user's favorites
    }
  }, [movieId, movies, user.FavMovies]);

  const handleFavoriteToggle = () => {
    if (isFav) {
      onRemoveFromFavorites(movieId);
    } else {
      onAddToFavorites(movieId);
    }
    setIsFav(!isFav); // Update local state
    navigate('/profile'); // Navigate to profile after updating favorites
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  const similarMovies = movies.filter(
    (m) => m.id !== movieId && m.genre.Name === movie.genre.Name,
  );

  return (
    <div className="page-background">
      <Card className="movie-view">
        <Container>
          <Row xs={1} sm={1} md={2}>
            <Col className="image-container">
              <img className="image" src={movie.imagePath} alt={movie.title} />
            </Col>
            <Col className="text-container">
              <Card.Body>
                <Card.Title className="card-title">{movie.title}</Card.Title>
                <p className="description">
                  <strong>
                    <u>Description:</u>{' '}
                  </strong>
                  {movie.description}
                </p>
                <p className="genre">
                  <strong>
                    <u>Genre:</u>{' '}
                  </strong>
                  {movie.genre.Name}
                  <br />
                  {movie.genre.Description}
                </p>
                <p className="director">
                  <strong>
                    <u>Director:</u>{' '}
                  </strong>
                  <span>{movie.director.Name}&nbsp;</span>
                  <br />
                  <span>Bio: {movie.director.Bio}&nbsp;</span>
                  <br />
                  <span>Birth: {movie.director.Birth}&nbsp;</span>
                </p>
                <p className="featured">
                  <strong>
                    <u>Featured:</u>{' '}
                  </strong>
                  {movie.featured}
                </p>
                <p className="actors">
                  <strong>
                    <u>Actors:</u>{' '}
                  </strong>
                  {movie.actors.join(', ')}
                </p>

                <Button onClick={handleFavoriteToggle}>
                  {isFav ? 'Remove from Favorites' : 'Add to Favorites'}
                </Button>

                <Link to="/">
                  <Button className="back-button">Back</Button>
                </Link>
              </Card.Body>
            </Col>
          </Row>

          <h3>Similar Movies</h3>
          <Row xs={1} sm={2} md={3} className="similar-movies-card">
            {similarMovies.map((similarMovie) => (
              <Col key={similarMovie.id}>
                <MovieCard
                  movie={similarMovie}
                  fav={FavMovies.includes(similarMovie.id)}
                />
              </Col>
            ))}
          </Row>
        </Container>
      </Card>
    </div>
  );
};

MovieView.propTypes = {
  movies: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  FavMovies: PropTypes.array,
  onAddToFavorites: PropTypes.func.isRequired,
  onRemoveFromFavorites: PropTypes.func.isRequired,
};
