import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Col, Row, Card, Button, Figure } from 'react-bootstrap';
import './profile-view.scss';

const FavMovies = ({
  FavMoviesList,
  onAddToFavorites,
  onRemoveFromFavorites,
  movies,
}) => {
  const handleRemoveFromFavorites = (id) => {
    if (
      window.confirm(
        'Are you sure you want to remove this movie from your favorites?',
      )
    ) {
      onRemoveFromFavorites(id);
    }
  };

  return (
    <Card>
      <Card.Body>
        <Row>
          {Array.isArray(FavMoviesList) && FavMoviesList.length > 0 ? (
            FavMoviesList.map(({ id, imagePath, title }) => (
              <Col xs={12} md={6} lg={3} key={id} className="fav-movie">
                <Figure>
                  <Link to={`/movies/${id}`}>
                    <Figure.Image src={imagePath} alt={title} />
                    <Figure.Caption>{title}</Figure.Caption>
                  </Link>
                </Figure>
                <Button
                  variant="secondary"
                  onClick={() => handleRemoveFromFavorites(id)}
                  aria-label={`Remove ${title} from favorites`}
                >
                  Remove
                </Button>
              </Col>
            ))
          ) : (
            <Col xs={12}>
              <p>No movies in favorites</p>
            </Col>
          )}
        </Row>
        <Row>
          <Col xs={12}>
            <h4>Add a movie to Favorites</h4>
            {Array.isArray(movies) && movies.length > 0 ? (
              movies.map(({ id, title }) => (
                <Button
                  key={id}
                  onClick={() => onAddToFavorites(id)}
                  aria-label={`Add ${title} to favorites`}
                >
                  {title}
                </Button>
              ))
            ) : (
              <p>No movies available</p>
            )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

FavMovies.propTypes = {
  FavMoviesList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      imagePath: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onAddToFavorites: PropTypes.func,
  onRemoveFromFavorites: PropTypes.func,
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default FavMovies;
