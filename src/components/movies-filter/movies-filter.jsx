import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';

const MoviesFilter = ({ filter, setFilter }) => (
  <Form.Control
    type="text"
    placeholder="Search..."
    value={filter}
    onChange={(e) => setFilter(e.target.value)}
  />
);

MoviesFilter.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default MoviesFilter;
