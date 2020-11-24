/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from 'containers/Login';
import Registry from 'containers/Registry';
import ChangePassword from 'containers/ChangePassword';
import ResetPassword from 'containers/ResetPassword';
import ProtectedRoute from 'components/ProtectedRoute';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/auth" component={Login} />
        <Route exact path="/registry" component={Registry} />
        <Route
          exact
          path="/account-confirm-email/:key"
          component={ChangePassword}
        />
        <Route exact path="/account-confirm-email/" component={ResetPassword} />
        <Route exact path="/reset/:key/:key" component={ChangePassword} />
        <ProtectedRoute exact path="/" component={HomePage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
