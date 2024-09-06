import { useParams, Link } from 'react-router-dom';
import './movie-view.scss';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';

export const MovieView = ({
  movies,
  favMovies,
  onAddToFavorites,
  onRemoveFromFavorites,
}) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);
  const [isFav, setIsFav] = useState(favMovies?.includes(movieId) || false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // const [favMovies, setFavMovies] = useState([]);

  if (!movie) {
    return <div>Movie not found</div>;
  }

  const handleFavoriteClick = () => {
    setIsFav(!isFav);
    if (isFav) onRemoveFromFavorites(movieId);
    else onAddToFavorites(movieId);
  };

  const similarMovies = movies.filter(
    (m) => m._id !== movieId && m.genre.name === movie.genre.name,
  );

  if (selectedMovie) {
    return (
      <>
        <MovieView
          movie={selectedMovie}
          onBackClicked={() => {
            setSelectedMovie(null);
          }}
        />
        <br />
        <h2>Similar Movies</h2>
        {similarMovies.map((m) => (
          <MovieCard
            key={m._id}
            movie={m}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        ))}
      </>
    );
  }

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
              <p>Genre: {movie.genre.Name}</p>
              <p>
                Director: <span>{movie.director.Name}&nbsp;</span>
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

export default MovieView;
