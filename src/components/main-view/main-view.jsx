import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { LoginView } from '../login-view/login-view';
import MoviesList from '../movies-list/movies-list';
import { MovieView } from '../movie-view/movie-view';
import { SignupView } from '../signup-view/signup-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { ProfileView } from '../profile-view/profile-view';
// import { MovieCard } from '../movie-card/movie-card';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(storedUser || null);
  const [token, setToken] = useState(storedToken || null);
  const [movies, setMovies] = useState([]);
  const [favMovies, setFavMovies] = useState(user?.FavoriteMovies || []);

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

  useEffect(() => {
    setFavMovies(user?.FavoriteMovies || []);
  }, [user]);

  return (
    <BrowserRouter>
      <Row>
        <NavigationBar />
      </Row>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <Routes>
            {!user ? (
              <>
                <Route path="/signup" element={<SignupView />} />
                <Route
                  path="/login"
                  element={
                    <LoginView
                      onLoggedIn={(loggedInUser, loggedInUserToken) => {
                        setUser(loggedInUser);
                        setToken(loggedInUserToken);
                        localStorage.setItem(
                          'user',
                          JSON.stringify(loggedInUser),
                        );
                        localStorage.setItem('token', loggedInUserToken);
                      }}
                    />
                  }
                />
                <Route path="/" element={<Navigate to="/login" />} />
              </>
            ) : (
              <>
                <Route
                  path="/"
                  element={
                    movies.length === 0 ? (
                      <Col>The list is empty!</Col>
                    ) : (
                      <MoviesList movies={movies} favMovies={favMovies} />
                    )
                  }
                />
                <Route
                  path="/movies/:movieId"
                  element={
                    <MovieView
                      movies={movies}
                      favMovies={favMovies}
                      onAddToFavorites={(movieId) =>
                        setFavMovies([...favMovies, movieId])
                      }
                      onRemoveFromFavorites={(movieId) =>
                        setFavMovies(favMovies.filter((id) => id !== movieId))
                      }
                    />
                  }
                />
                <Route path="/profile" element={<ProfileView user={user} />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </>
            )}
          </Routes>
        </Col>
      </Row>
    </BrowserRouter>
  );
};
