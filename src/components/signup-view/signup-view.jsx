import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const SignupView = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birth, setBirth] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birth: birth,
    };

    fetch('https://tracys-movie-api-083e9c37dd14.herokuapp.com/users', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (response.ok) {
        alert('Signup successful!');
        window.location.reload();
      } else {
        alert('Signup failed.');
      }
    });
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <Form
        onSubmit={handleSubmit}
        className="justify-content-center align-items-center"
      >
        <Form.Group controlId="signUpFormUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="3"
          />
        </Form.Group>

        <Form.Group controlId="signUpFormPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="signUpFormEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="signUpFormBirth">
          <Form.Label>Birth:</Form.Label>
          <Form.Control
            type="year"
            value={birth}
            onChange={(e) => setBirth(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
};
