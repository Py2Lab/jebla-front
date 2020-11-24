/**
 *
 * ChangePassword
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Alert } from '@material-ui/lab';
import { Link as RouterLink } from 'react-router-dom';
import LockIcon from '@material-ui/icons/Lock';
import {
  Avatar,
  Box,
  Container,
  Card,
  CardContent,
  Divider,
  Typography,
  makeStyles,
} from '@material-ui/core';
import Notifications from 'containers/Notifications';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { changePassword, autenticateEmail } from './actions';
import makeSelectChangePassword from './selectors';
import LoginForm from './LoginForm';
import reducer from './reducer';
import saga from './saga';

const useStyles = makeStyles(theme => ({
  root: {
    justifyContent: 'center',
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    minHeight: '100%',
    flexDirection: 'column',
    paddingBottom: 80,
    paddingTop: 80,
  },
  backButton: {
    marginLeft: theme.spacing(2),
  },
  card: {
    overflow: 'visible',
    display: 'flex',
    position: 'relative',
    '& > *': {
      flexGrow: 1,
      flexBasis: '50%',
      width: '50%',
    },
  },
  content: {
    padding: theme.spacing(8, 4, 3, 4),
  },
  icon: {
    backgroundColor: '#D18525',
    color: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    position: 'absolute',
    top: -32,
    left: theme.spacing(3),
    height: 64,
    width: 64,
  },
  media: {
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    padding: theme.spacing(3),
    color: theme.palette.common.white,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
}));

export function ChangePassword(props) {
  useInjectReducer({ key: 'changePassword', reducer });
  useInjectSaga({ key: 'changePassword', saga });
  const classes = useStyles();

  useEffect(() => {
    if (props.history.location.pathname.includes('account-confirm-email')) {
      if (
        window.location.href
          .toString()
          .split(`${window.location.host}/account-confirm-email/`)[1]
          .split('/')[0] !== undefined
      ) {
        props.dispatch(
          autenticateEmail(
            window.location.href
              .toString()
              .split(`${window.location.host}/account-confirm-email/`)[1]
              .split('/')[0],
            props.history,
          ),
        );
      }
    }
  }, []);

  const handleSubmitSuccess = values => {
    if (props.history.location.pathname.includes('account-confirm-email')) {
      props.dispatch(
        changePassword(
          'code',
          'key',
          values.password,
          values.password_confirm,
          props.history,
        ),
      );
    } else {
      const code = window.location.href
        .toString()
        .split(`${window.location.host}/reset/`)[1]
        .split('/')[0];
      const key = window.location.href
        .toString()
        .split(`${window.location.host}/reset/`)[1]
        .split('/')[1];
      props.dispatch(
        changePassword(
          code,
          key,
          values.password,
          values.password_confirm,
          props.history,
        ),
      );
    }
  };

  return (
    <div className={classes.root} title="Login">
      <Notifications />
      <Container maxWidth="md">
        <Box mb={8} display="flex" alignItems="center">
          <RouterLink to="/">{/* <Logo /> */}</RouterLink>
        </Box>
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            <Avatar className={classes.icon}>
              <LockIcon fontSize="large" />
            </Avatar>
            <Typography variant="h2" color="textPrimary">
              Cambia tu contraseña
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Personaliza tu contraseña
            </Typography>
            <Box mt={2}>
              <Alert severity="info">
                <div>Recuerda que las dos contraseñas deben de coincidir</div>
              </Alert>
            </Box>
            <Box mt={3}>
              <LoginForm
                onSubmitSuccess={values => handleSubmitSuccess(values)}
              />
            </Box>
            <Box my={2}>
              <Divider />
            </Box>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

ChangePassword.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  changePassword: makeSelectChangePassword(),
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

export default compose(withConnect)(ChangePassword);
