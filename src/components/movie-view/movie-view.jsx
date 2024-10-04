import {
  useParams,
  Link,
  useNavigate,
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
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
  const movie = (Array.isArray(movies) ? movies : []).find(
    (m) => m.id === movieId,
  );
  const [isFav, setIsFav] = useState(favMovies?.includes(movieId) || false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const navigate = useNavigate();

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
    (m) => m.id !== movieId && m.genre.Name === movie.genre.Name,
  );

  if (selectedMovie) {
    return (
      <Router>
        <Routes>
          <Route>
            <MovieView
              movies={selectedMovie}
              favMovies={favMovies}
              onAddToFavorites={onAddToFavorites}
              onRemoveFromFavorites={onRemoveFromFavorites}
              onBackClicked={() => {
                setSelectedMovie(null);
              }}
            />
          </Route>

          <br />
          <h2>Similar Movies</h2>
          <Route>
            {similarMovies.map((m) => (
              <MovieCard
                key={m.id}
                movie={m}
                fav={favMovies.includes(movie.id)}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                  navigate(`/movies/${newSelectedMovie.id}`);
                }}
              />
            ))}
          </Route>
        </Routes>
      </Router>
    );
  }

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
                  <strong>Description: </strong>
                  {movie.description}
                </p>
                <p className="genre">
                  <strong>Genre: </strong>
                  {movie.genre.Name}
                  <br />
                  {movie.genre.Description}
                </p>
                <p className="director">
                  <strong>Director: </strong>
                  <span>{movie.director.Name}&nbsp;</span>
                  <br />
                  <span>Bio: {movie.director.Bio}&nbsp;</span>
                  <br />
                  <span>Birth: {movie.director.Birth}&nbsp;</span>
                </p>
                <p className="featured">
                  <strong>Featured: </strong>
                  {movie.featured}
                </p>
                <p className="actors">
                  <strong>Actors: </strong>
                  {movie.actors.join(', ')}
                </p>
                <Button onClick={() => handleFavoriteClick()}>
                  {!isFav ? 'Add to favorites' : 'Remove from favorites'}
                </Button>

                <Link to="/">
                  <Button className="back-button">Back</Button>
                </Link>
              </Card.Body>
            </Col>
          </Row>
        </Container>
      </Card>
    </div>
  );
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      imagePath: PropTypes.string.isRequired,
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
    }),
  ).isRequired,
  favMovies: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAddToFavorites: PropTypes.func.isRequired,
  onRemoveFromFavorites: PropTypes.func.isRequired,
};

export default MovieView;
