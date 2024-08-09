import { useParams, Link } from 'react-router-dom';
import './movie-view.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
import { addFavorite, removeFavorite } from '../../redux/reducers/user/user';

export const MovieView = () => {
  const { movieId } = useParams();
  const movies = useSelector((state) => state.movies.list);
  const favMovies = useSelector((state) => state.user.favorites);
  const dispatch = useDispatch();
  const [isFav, setIsFav] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    setIsFav(favMovies.includes(movieId));
  }, [movieId, favMovies]);

  const movie = movies.find((m) => m._id === movieId);

  if (!movie) {
    return <div>Movie not found</div>;
  }

  const handleFavoriteClick = () => {
    if (isFav) {
      dispatch(removeFavorite(movieId));
    } else {
      dispatch(addFavorite(movieId));
    }
    setIsFav(!isFav);
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

export default MovieView;
