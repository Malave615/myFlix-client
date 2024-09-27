import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './navigation-bar.scss';

export const NavigationBar = ({ user, onLoggedOut }) => (
  <Navbar className="navbar" expand="lg">
    <Container className="navbar-button">
      <Navbar.Brand as={Link} to="/">
        Movie App
      </Navbar.Brand>
      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        className="navbar-button"
      />
      <Navbar.Collapse id="basic-navbar-nav" className="navbar-button">
        <Nav className="navbar-button">
          {!user && (
            <>
              <Nav.Link className="navbar-button" as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link className="navbar-button" as={Link} to="/signup">
                Signup
              </Nav.Link>
            </>
          )}
          {user && (
            <>
              <Nav.Link className="navbar-button" as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link className="navbar-button" as={Link} to="/profile">
                Profile
              </Nav.Link>
              <Nav.Link className="navbar-button" onClick={onLoggedOut}>
                Logout
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

NavigationBar.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string,
    FavoriteMovies: PropTypes.array,
  }).isRequired,
  onLoggedOut: PropTypes.func.isRequired,
};
