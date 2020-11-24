/**
 *
 * Registry
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import LockIcon from '@material-ui/icons/Lock';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Avatar,
  Box,
  Container,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Typography,
  makeStyles,
} from '@material-ui/core';
import Notifications from 'containers/Notifications';
import { Alert } from '@material-ui/lab';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { submit } from './actions';
import LoginForm from './LoginForm';
import makeSelectRegistry from './selectors';
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

export function Registry(props) {
  useInjectReducer({ key: 'registry', reducer });
  useInjectSaga({ key: 'registry', saga });

  const classes = useStyles();

  const handleSubmitSuccess = values => {
    props.dispatch(submit(values.email, values.password, props.history));
  };

  return (
    <div className={classes.root} title="Login">
      <Notifications />
      <Container maxWidth="md">
        <Box mb={8} display="flex" alignItems="center">
          <RouterLink to="/auth">{/* <Logo /> */}</RouterLink>
        </Box>
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            <Avatar className={classes.icon}>
              <LockIcon fontSize="large" />
            </Avatar>
            <Typography variant="h2" color="textPrimary">
              Registro
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Llena los campos correspondientes para registrarte
            </Typography>
            {/* <Box mt={2}>
              <Alert severity="info">
                <div>
                  Cualquier inconveniente comunicarse a soporte{' '}
                  <b>https://nom035.online/</b>
                </div>
              </Alert>
            </Box> */}
            <Box mt={3}>
              <LoginForm
                onSubmitSuccess={values => handleSubmitSuccess(values)}
              />
            </Box>
            <Box my={2}>
              <Divider />
            </Box>
          </CardContent>
          <CardMedia
            className={classes.media}
            image="https://deproconsultores.com/wp-content/uploads/2018/11/Art-245-Trabajo-en-casa.jpg"
            title="Cover"
          >
            <Typography color="inherit" variant="subtitle1">
              Hella narvwhal Cosby sweater McSweeney&apos;s, salvia kitsch
              before they sold out High Life.
            </Typography>
            <Box alignItems="center" display="flex" mt={3}>
              <Avatar alt="Person" src="/static/images/avatars/avatar_2.png" />
              <Box ml={3}>
                <Typography color="inherit" variant="body1">
                  Ekaterina Tankova
                </Typography>
                <Typography color="inherit" variant="body2">
                  Manager at inVision
                </Typography>
              </Box>
            </Box>
          </CardMedia>
        </Card>
      </Container>
    </div>
  );
}

Registry.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  registry: makeSelectRegistry(),
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

export default compose(withConnect)(Registry);
