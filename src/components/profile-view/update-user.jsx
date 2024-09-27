import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';

const UpdateUser = ({ handleUpdate, user }) => (
  <>
    <h2>Want to change some info?</h2>
    <Form className="profile-form">
      <Form.Group>
        <Form.Label htmlFor="username">Username:</Form.Label>
        <Form.Control
          type="text"
          name="Username"
          defaultValue={user.Username}
          onChange={(e) => handleUpdate(e)}
          required
          placeholder="Enter a username"
        />
      </Form.Group>

      <Form.Group>
        <Form.Label htmlFor="password">Password:</Form.Label>
        <Form.Control
          type="password"
          name="Password"
          defaultValue={user.Password}
          onChange={handleUpdate}
          required
          placeholder="Enter a password"
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Update
      </Button>
    </Form>
  </>
);

UpdateUser.propTypes = {
  handleUpdate: PropTypes.func.isRequired,
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
  }).isRequired,
};

export default UpdateUser;
