import React, { useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './profile-view.scss';
import PropTypes from 'prop-types';
import UserInfo from './user-info';
import FavoriteMovies from './favorite-movies';
import UpdateUser from './update-user';

// Define the ProfileView component
export const ProfileView = ({ movies, user, updateUser, handleUserLogout }) => {
  const favoriteMoviesList = movies.filter((m) =>
    user.FavoriteMovies.includes(m._id),
  );
  /* const handleUserLogout = () => {
      console.log('User logged out');
  } */

  useEffect(() => {
    console.log(user);
  }, [user]);

  const handleUpdate = (e, updatedUser) => {
    e.preventDefault();

    fetch(
      `https://tracys-movie-api-083e9c37dd14.herokuapp.com/users/${
        user.Username
      }${localStorage.getItem('user')}`,
      {
        method: 'PUT',
        body: JSON.stringify(updatedUser),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        updateUser(data);
      })
      .catch((error) => {
        console.error('Error updating user: ', e);
      });
  };

  return (
    <Container>
      <Row>
        <h1>{user.Username}'s Profile</h1>
        <Col xs={12} sm={4}>
          <Card>
            <Card.Body>
              <UserInfo name={user.Username} email={user.Email} />
              <FavoriteMovies movies={favoriteMoviesList} />
              <UpdateUser user={user} handleUpdate={handleUpdate} />
              <button type="button" onClick={handleUserLogout}>
                Logout
              </button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

ProfileView.propTypes = {
  movies: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired,
  handleUserLogout: PropTypes.func.isRequired,
};

export default ProfileView;
