import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Col, Row, Card, Button, Figure } from 'react-bootstrap';
import './profile-view.scss';

const FavoriteMovies = ({ favoriteMovieList, removeFav }) => (
  <Card>
    <Card.Body>
      <Row>
        <Col xs={12}>
          <h4>Favorite Movies</h4>
        </Col>
      </Row>
      <Row>
        {favoriteMovieList.map(({ _id, ImagePath, Title }) => (
          <Col xs={12} md={6} lg={3} key={_id} className="fav-movie">
            <Figure>
              <Link to={`/movies/${_id}`}>
                <Figure.Image src={ImagePath} alt={Title} />
                <Figure.Caption>{Title}</Figure.Caption>
              </Link>
            </Figure>
            <Button variant="secondary" onClick={() => removeFav(_id)}>
              Remove
            </Button>
          </Col>
        ))}
      </Row>
    </Card.Body>
  </Card>
);

FavoriteMovies.propTypes = {
  favoriteMovieList: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      ImagePath: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
    }),
  ).isRequired,
  removeFav: PropTypes.func.isRequired,
};

export default FavoriteMovies;
