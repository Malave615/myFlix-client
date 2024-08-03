import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { SignupView } from '../signup-view/signup-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { ProfileView } from '../profile-view/profile-view';
import { MovieCard } from '../movie-card/movie-card';

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
    if (!user) setFavMovies([]);
    else setFavMovies(user.FavoriteMovies || []);
  }, [user]);

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

    return (
      <BrowserRouter>
        <NavigationBar />
        <Row className="justify-content-md-center">
          <Routes>
            <Route
              path="/signup"
              element={
                user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )
              }
            />
            <Route
              path="/login"
              element={
                user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView
                      onLoggedIn={(loggedInUser) => setUser(loggedInUser)}
                    />
                  </Col>
                )
              }
            />
            {!user && <Navigate to="/login" replace />}
            {user && movies.length === 0 && <Col>The list is empty!</Col>}
            {user && movies.length > 0 && (
              <>
                <Route
                  path="/movies/:movieId"
                  element={
                    <Col md={8}>
                      <MovieView movies={movies} favMovies={favMovies} />
                    </Col>
                  }
                />
                <Route
                  path="/"
                  element={movies.map((movie) => (
                    <Col className="mb-4" key={movie.id} md={3}>
                      <MovieCard
                        movie={movie}
                        fav={favMovies.includes(movie._id)}
                      />
                    </Col>
                  ))}
                />
                <Route
                  path="/profile"
                  element={
                    !user ? (
                      <Navigate to="/login" replace />
                    ) : (
                      <ProfileView
                        movies={movies}
                        user={user}
                        setFavMovies={setFavMovies}
                      />
                    )
                  }
                />
              </>
            )}
          </Routes>
        </Row>
      </BrowserRouter>
    );
  };

  return <Row className="justify-content-md-center">{renderContent()}</Row>;
};
