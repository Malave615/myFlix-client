import { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(storedUser || null);
  const [token, setToken] = useState(storedToken || null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!token) return;

    fetch('https://tracys-movie-api-083e9c37dd14.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => ({
          id: movie.key,
          image: movie.image,
          title: movie.title,
          description: movie.description,
          genre: movie.genre,
          director: movie.director,
          actors: movie.actors,
        }));
        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
      });
  }, [token]);

  const renderContent = () => {
    if (!user) {
      return (
        <Col md={5}>
          <LoginView
            onLoggedIn={(loggedInUser, loggedInUserToken) => {
              setUser(loggedInUser);
              setToken(loggedInUserToken);
            }}
          />
          <p>or</p>
          <SignupView />
        </Col>
      );
    }
    if (selectedMovie) {
      return (
        <Col md={8}>
          <MovieView
            movie={selectedMovie}
            onBackClick={() => setSelectedMovie(null)}
          />
        </Col>
      );
    }

    if (movies.length === 0) {
      return <div>The list is empty!</div>;
    }

    return (
      <>
        {movies.map((movie) => (
          <Col className="mb-5" key={movie.id} md={3}>
            <MovieCard
              movie={movie}
              onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
              }}
            />
          </Col>
        ))}
      </>
    );
  };

  return <Row className="justify-content-md-center">{renderContent()}</Row>;
};
