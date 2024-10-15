import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
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
  const [FavMovies, setFavMovies] = useState(storedUser?.FavMovies || []);
  const [searchQuery, setSearchQuery] = useState('');

  const updateUserState = (updatedUser) => {
    setUser({
      ...updatedUser,
      FavMovies: Array.isArray(updatedUser.FavMovies)
        ? updatedUser.FavMovies
        : [],
    });
  };

  const handleUpdate = (updatedUser) => {
    updateUserState(updatedUser);
  };

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

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleLogIn = (loggedInUser, loggedInToken) => {
    if (!isValidEmail(loggedInUser.Email)) {
      console.error('Invalid email format:', loggedInUser.Email);
      return;
    }

    console.log('Logged in User:', loggedInUser);
    setToken(loggedInToken);
    localStorage.setItem('user', JSON.stringify(loggedInUser));
    localStorage.setItem('token', loggedInToken);
    updateUserState(loggedInUser);
  };

  useEffect(() => {
    if (user) {
      setFavMovies(user.FavMovies || []); // Set FavMovies if user
    } else {
      setFavMovies([]); // Reset if no user
    }
  }, [user]);

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleAddToFavorites = (movieId) => {
    if (!user) {
      console.error('User is not logged in.');
      return;
    }

    const updatedFavMovies = Array.from(new Set([...user.FavMovies, movieId]));

    // Make API call to update favorites on the server
    fetch(
      `https://tracys-movie-api-083e9c37dd14.herokuapp.com/users/${user.Username}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...user, FavMovies: updatedFavMovies }),
      },
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Failed to update favorites: ${response.status} ${response.statusText}`,
          );
        }
        return response.json();
      })
      .then((data) => {
        // Log the data to see its structure
        console.log('Updated user data:', data);
        updateUserState(data);
        setFavMovies(data.FavMovies || []);
      })
      .catch((error) => {
        console.error('Error adding to Favorites:', error);
      });
  };

  const handleRemoveFromFavorites = (movieId) => {
    if (!user) {
      console.error('User is not logged in.');
      return;
    }

    const updatedFavMovies = user.FavMovies.filter((id) => id !== movieId);

    fetch(
      `https://tracys-movie-api-083e9c37dd14.herokuapp.com/users/${user.Username}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...user, FavMovies: updatedFavMovies }),
      },
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Failed to update favorites: ${response.status} ${response.statusText}`,
          );
        }
        return response.json();
      })
      .then((data) => {
        console.log('Updated user data:', data);
        updateUserState(data);
      })
      .catch((error) => {
        console.error('Error removing from Favorites:', error);
      });
  };

  const renderContent = () => {
    if (!user) {
      return (
        <Col md={5} className="mb-4">
          <div className="login">
            <h1 className="header">myFlix</h1>
            <LoginView onLoggedIn={handleLogIn} />
          </div>
          <p>or</p>
          <SignupView />
        </Col>
      );
    }

    return (
      <BrowserRouter>
        <NavigationBar user={user} onLoggedOut={handleLogout} />
        <div className="page-backgorund">
          <Row className="justify-content-md-center">
            <input
              type="text"
              placeholder="Search for a movie by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <Routes>
              <Route
                path="/"
                element={
                  <div className="home-background">
                    <Row className="justify-content-md-center" mb={4}>
                      {filteredMovies.map((movie) => (
                        <Col key={movie.id} md={3} className="mb-4">
                          <MovieCard
                            movie={movie}
                            fav={FavMovies.includes(movie.id)}
                          />
                          <Link to={`/movies/${movie.id}`} />
                        </Col>
                      ))}
                    </Row>
                  </div>
                }
              />
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
                      <LoginView onLoggedIn={handleLogIn} />
                    </Col>
                  )
                }
              />
              {user && movies.length > 0 && (
                <>
                  <Route
                    path="/movies/:movieId"
                    element={
                      <Col md={8}>
                        <MovieView
                          movies={movies}
                          user={user || {}}
                          FavMovies={FavMovies}
                          onAddToFavorites={handleAddToFavorites}
                          onRemoveFromFavorites={handleRemoveFromFavorites}
                        />
                      </Col>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <Col md={12}>
                        <div className="home-background">
                          <ProfileView
                            movies={movies}
                            user={user}
                            updateUser={handleUpdate}
                            handleUserLogout={handleLogout}
                            setFavMovies={setFavMovies}
                            setUser={setUser}
                            onAddToFavorites={handleAddToFavorites}
                            onRemoveFromFavorites={handleRemoveFromFavorites}
                          />
                        </div>
                      </Col>
                    }
                  />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </>
              )}
            </Routes>
          </Row>
        </div>
      </BrowserRouter>
    );
  };

  return <Row className="justify-content-md-center">{renderContent()}</Row>;
};
