/**
 *
 * Notifications
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Snackbar from '@material-ui/core/Snackbar';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectNotifications from './selectors';
import reducer from './reducer';
import ContentWrapper from './ContentWrapper';
import saga from './saga';
import { clearMessage } from './actions';

export function Notifications(props) {
  useInjectReducer({ key: 'notifications', reducer });
  useInjectSaga({ key: 'notifications', saga });
  useEffect(() => {
    if (props.notifications.message !== '') {
      setTimeout(() => {
        props.dispatch(clearMessage());
      }, props.notifications.duration * 1000);
    }
  }, []);
  const clearNotification = () => {
    props.dispatch(clearMessage());
  };
  if (props.notifications.message !== '') {
    return (
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        style={{
          width: '100%',
        }}
      >
        <ContentWrapper
          onClose={clearNotification}
          variant={props.notifications.type}
          message={props.notifications.message}
        />
      </Snackbar>
    );
  }
  return null;
}

Notifications.propTypes = {
  dispatch: PropTypes.func.isRequired,
  notifications: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  notifications: makeSelectNotifications(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Notifications);
