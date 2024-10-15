import React from 'react';
import PropTypes from 'prop-types';
import './profile-view.scss';

const UserInfo = ({ name, email }) => (
  <>
    <h4>Your Info</h4>
    <p>Name: {name}</p>
    <p>Email: {email}</p>
  </>
);

UserInfo.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default UserInfo;
