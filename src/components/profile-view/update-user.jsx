import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
// import { error } from 'jquery';

const UpdateUser = ({ user, updateUser, setUser }) => {
  const token = localStorage.getItem('token');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleUpdate = (event) => {
    event.preventDefault();

    const updatedData = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch(
      `https://tracys-movie-api-083e9c37dd14.herokuapp.com/users/${user.Username}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      },
    )
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return response.json();
        }
        alert('Update failed.');
      })
      .then((data) => {
        setUser(data);
        updateUser(data);
        alert('Your info has been updated!');
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Error updating user: ', error);
      });
  };

  return (
    <Form className="profile-form" onSubmit={handleUpdate}>
      <h2>Want to change some info?</h2>
      <Form.Group>
        <Form.Label htmlFor="username">Username:</Form.Label>
        <Form.Control
          type="text"
          name="Username"
          defaultValue={user.Username}
          onChange={(e) => setUsername(e.target.value)}
          required
          placeholder="Enter a username"
        />
      </Form.Group>

      <Form.Group>
        <Form.Label htmlFor="password">Password:</Form.Label>
        <Form.Control
          type="password"
          name="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Enter a password"
        />
      </Form.Group>

      <Form.Group>
        <Form.Label htmlFor="email">Email:</Form.Label>
        <Form.Control
          type="email"
          name="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter an email"
        />
      </Form.Group>

      <Form.Group>
        <Form.Label htmlFor="birthday">Birthday:</Form.Label>
        <Form.Control
          type="date"
          name="Birthday"
          defaultValue={user.Birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
          placeholder="Enter a birthday"
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Edit Info
      </Button>
    </Form>
  );
};

UpdateUser.propTypes = {
  user: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
};

export default UpdateUser;
