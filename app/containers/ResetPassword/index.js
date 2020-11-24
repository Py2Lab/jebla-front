/**
 *
 * AuthFormConfirmed
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link as RouterLink } from 'react-router-dom';
import LockIcon from '@material-ui/icons/Lock';
import { compose } from 'redux';
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
import makeSelectAuthFormConfirmed from './selectors';
import LoginForm from './LoginForm';
import reducer from './reducer';
import saga from './saga';
import { resetPassword } from './actions';

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

export function AuthFormConfirmed(props) {
  useInjectReducer({ key: 'authFormConfirmed', reducer });
  useInjectSaga({ key: 'authFormConfirmed', saga });
  const classes = useStyles();
  useEffect(() => {}, []);
  const handleSubmitSuccess = values => {
    props.dispatch(resetPassword(values.email, props.history));
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
              Personaliza tu contraseña
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              cambia tu contraseña para tener mejor control sobre tu cuenta
            </Typography>
            {/* <Box mt={2}>
              <Alert severity="info">
                <div>
                  Cualquier inconveniente comunicarse a soporte{' '}
                  <b>https://nom035.online/</b>
                </div>
              </Alert>
            </Box> */}
            <Box my={2}>
              <Divider />
            </Box>
            <Box mt={3}>
              <LoginForm
                onSubmitSuccess={values => handleSubmitSuccess(values)}
              />
            </Box>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

AuthFormConfirmed.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  authFormConfirmed: makeSelectAuthFormConfirmed(),
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

export default compose(withConnect)(AuthFormConfirmed);
