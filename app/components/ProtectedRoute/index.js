/**
 *
 * Higher Order Component that blocks navigation when the user is not logged in
 * and redirect the user to login page
 *
 * Wrap your protected routes to secure your container
 */

import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import auth from 'utils/auth';

const jwt = require('jsonwebtoken');

const checkTokenExpiration = () => {
  let decoded = {};
  try {
    decoded = jwt.decode(auth.getToken());
    const dateNow = new Date().getTime() / 1000;

    if (decoded.exp > dateNow) {
      return true;
    }
  } catch (error) {
    return false;
  }
  return false;
};

/* eslint-disable react/prefer-stateless-function */
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      checkTokenExpiration() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/auth',
            state: { from: props.location, expired: true },
          }}
        />
      )
    }
  />
);

ProtectedRoute.propTypes = {
  component: PropTypes.object,
  location: PropTypes.object,
};

export default ProtectedRoute;
