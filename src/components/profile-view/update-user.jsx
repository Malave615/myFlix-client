import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap/Form';

const UpdateUser = ({ handleSubmit, handleUpdate, user }) => (
  <>
    <h2>Want to change some info?</h2>
    <form className="profile-form" onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        name="Username"
        defaultValue={user.Username}
        onChange={(e) => handleUpdate(e)}
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        name="Password"
        defaultValue={user.Password}
        onChange={(e) => handleUpdate(e)}
      />
    </form>

    <h4>Update</h4>
    <Form>
      <Form.Group>
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          defaultValue={user.Username}
          onChange={(e) => handleUpdate(e)}
          required
          placeholder="Enter a username"
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          defaultValue={user.Password}
          onChange={(e) => handleUpdate(e)}
          required
          placeholder="Enter a password"
        />
      </Form.Group>
    </Form>
  </>
);

UpdateUser.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
  }).isRequired,
};

export default UpdateUser;
