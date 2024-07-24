import { useState, useEffect } from 'react';
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
    if (!token) {
      return;
    }

    fetch('https://tracys-movie-api-083e9c37dd14.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then(
        (data) => {
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
        },
        [token],
      );

    if (!user) {
      return (
        <>
          <LoginView
            onLoggedIn={(loggedInUser, loggedInUserToken) => {
              setUser(loggedInUser);
              setToken(loggedInUserToken);
            }}
          />
          or
          <SignupView />
        </>
      );
    }

    if (selectedMovie) {
      return (
        <>
          <button
            type="button"
            onClick={() => {
              setUser(null);
              setToken(null);
              localStorage.clear();
            }}
          >
            Logout
          </button>
          <MovieView
            movie={selectedMovie}
            onBackClick={() => setSelectedMovie(null)}
          />
        </>
      );
    }

    if (movies.length === 0) {
      return (
        <>
          <button
            type="button"
            onClick={() => {
              setUser(null);
            }}
          >
            Logout
          </button>
          <div>The list is empty!</div>
        </>
      );
    }

    return (
      <div>
        <button
          type="button"
          onClick={() => {
            setUser(null);
          }}
        >
          Logout
        </button>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        ))}
      </div>
    );
  });
};
