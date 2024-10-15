import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './profile-view.scss';
import PropTypes from 'prop-types';
import UserInfo from './user-info';
import FavMovies from './favorite-movies';
import UpdateUser from './update-user';

// Define the ProfileView component
export function ProfileView({
  movies,
  user,
  updateUser,
  handleUserLogout,
  setFavMovies,
  setUser,
  onAddToFavorites,
  onRemoveFromFavorites,
}) {
  const FavMoviesList = movies.filter((movie) =>
    user.FavMovies.includes(movie.id),
  );

  useEffect(() => {
    if (user) {
      console.log(user);
      setFavMovies(user.FavMovies || []);
    }
  }, [user, setFavMovies]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedUser = {
      Username: e.target.Username.value,
      Password: e.target.Password.value,
    };

    fetch(
      `https://tracys-movie-api-083e9c37dd14.herokuapp.com/users/${user.Username}`,
      {
        method: 'PUT',
        body: JSON.stringify(updatedUser),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update user.');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        updateUser(data);
      })
      .catch((error) => {
        console.error('Error updating user: ', error);
      });
  };

  return (
    <Container className="profile-view">
      <Row>
        <h1>{user.Username}'s Profile</h1>
        <Col>
          <Card>
            <Card.Header>
              <UserInfo name={user.Username} email={user.Email} />
            </Card.Header>
          </Card>
        </Col>
        <Col xs={12} sm={4}>
          <Card>
            <Card.Header className="card-header">
              <h2>Favorite Movies</h2>
            </Card.Header>
            <Card.Body>
              <FavMovies
                FavMoviesList={FavMoviesList}
                onAddToFavorites={onAddToFavorites}
                onRemoveFromFavorites={onRemoveFromFavorites}
                movies={movies}
              />
            </Card.Body>
            <Card.Body>
              <UpdateUser
                user={user}
                updateUser={handleUpdate}
                setUser={setUser}
              />
            </Card.Body>
            <Card.Footer>
              <Button
                variant="primary"
                type="button"
                onClick={handleUserLogout}
              >
                Logout
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

ProfileView.propTypes = {
  movies: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  updateUser: PropTypes.func,
  handleUserLogout: PropTypes.func.isRequired,
  setFavMovies: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  onAddToFavorites: PropTypes.func.isRequired,
  onRemoveFromFavorites: PropTypes.func.isRequired,
};

export default ProfileView;
