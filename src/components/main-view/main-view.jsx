import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { SignupView } from '../signup-view/signup-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { ProfileView } from '../profile-view/profile-view';
import { MovieCard } from '../movie-card/movie-card';
import './main-view.scss';

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
        // This is what the movie object looks like
        const moviesFromApi = data.map((movie) => ({
          id: movie._id,
          title: movie.Title,
          description: movie.Description,
          genre: movie.Genre,
          director: {
            Name: movie.Director.Name,
            Bio: movie.Director.Bio,
            Birth: movie.Director.Birth,
          },
          actors: movie.Actors,
          featured: movie.Featured,
          imagePath: movie.ImagePath,
        }));
        // console.log(moviesFromApi); or console.log(data); ??
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

  const handleAddToFavorites = (movieId) => {
    if (!favMovies.includes(movieId)) {
      setFavMovies([...favMovies, movieId]);
    }
  };

  const handleRemoveFromFavorites = (movieId) => {
    setFavMovies(favMovies.filter((id) => id !== movieId));
  };

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  const renderContent = () => {
    if (!user) {
      return (
        <Col md={5} className="mb-4">
          <div className="login">
            <h1 className="header">myFlix</h1>
            <LoginView
              onLoggedIn={(loggedInUser, loggedInUserToken) => {
                setUser(loggedInUser);
                setToken(loggedInUserToken);
              }}
            />
          </div>
          <p>or</p>
          <SignupView />
        </Col>
      );
    }

    return (
      <BrowserRouter>
        <NavigationBar
          user={user}
          onLoggedOut={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
          }}
        />
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
            <Route
              path="/"
              element={
                <div className="home-background">
                  <Row className="justify-content-md-center" mb={4}>
                    {movies.map((movie) => (
                      <Col key={movie.id} md={3} className="mb-4">
                        <MovieCard
                          movie={movie}
                          fav={favMovies.includes(movie.id)}
                        />
                      </Col>
                    ))}
                  </Row>
                </div>
              }
            />
            {/* {!user && <Navigate to="/login" replace />} */}
            {/* {user && movies.length === 0 && <Col>The list is empty!</Col>} */}
            {user && movies.length > 0 && (
              <>
                <Route
                  path="/movies/:movieId"
                  element={
                    <Col md={8}>
                      <MovieView
                        movies={movies}
                        favMovies={favMovies}
                        onAddToFavorites={handleAddToFavorites}
                        onRemoveFromFavorites={handleRemoveFromFavorites}
                      />
                    </Col>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    !user ? (
                      <Navigate to="/login" replace />
                    ) : (
                      <div className="home-background">
                        <ProfileView
                          movies={movies}
                          user={user}
                          setFavMovies={setFavMovies}
                          updateUser={handleUpdateUser}
                          handleUserLogout={handleLogout}
                        />
                      </div>
                    )
                  }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </>
            )}
          </Routes>
        </Row>
      </BrowserRouter>
    );
  };

  return <Row className="justify-content-md-center">{renderContent()}</Row>;
};
