import { useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { MoviesList } from '../movies-list/movies-list';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { ProfileView } from '../profile-view/profile-view';

import { setMovies } from '../../redux/reducers/movies';

export const MainView = () => {
  const movies = useSelector((state) => state.movies.list);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('https://tracys-movie-api-083e9c37dd14.herokuapp.com/movies')
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

        dispatch(setMovies(moviesFromApi));
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
      });
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Row>
        <NavigationBar />
      </Row>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <Routes>
            {!user && (
              <>
                <Route path="/signup" element={<SignupView />} />
                <Route path="/login" element={<LoginView />} />
                <Route path="/" element={<Navigate to="/login" />} />
              </>
            )}
            {!user && (
              <>
                <Route
                  path="/"
                  element={
                    movies.length === 0 ? (
                      <Col>The list is empty!</Col>
                    ) : (
                      <MoviesList />
                    )
                  }
                />
                <Route path="/movies/:movieId" element={<MovieView />} />
                <Route path="/profile" element={<ProfileView />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </>
            )}
          </Routes>
        </Col>
      </Row>
    </BrowserRouter>
  );
};
