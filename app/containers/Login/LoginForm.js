import React from 'react';
import clsx from 'clsx';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Box, Typography, Link, Button } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {},
}));
function LoginForm({ className, onSubmitSuccess, ...rest }) {
  const classes = useStyles();

  const [visibility, setVisivility] = React.useState(false);

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        amount: '',
        weight: '',
        weightRange: '',
        showPassword: false,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Must be a valid email')
          .max(255)
          .required('Email is required'),
        password: Yup.string()
          .max(255)
          .required('Password is required'),
      })}
      onSubmit={async values => {
        onSubmitSuccess(values);
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        touched,
        values,
      }) => (
        <form
          noValidate
          className={clsx(classes.root, className)}
          onSubmit={handleSubmit}
          {...rest}
        >
          <TextField
            error={Boolean(touched.email && errors.email)}
            fullWidth
            autoFocus
            helperText={touched.email && errors.email}
            label="Correo Electronico"
            margin="normal"
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            type="email"
            value={values.email}
            variant="outlined"
          />

          <FormControl variant="outlined" style={{ width: '100%' }}>
            <InputLabel htmlFor="outlined-adornment-password">
              Contraseña
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              error={Boolean(touched.password && errors.password)}
              type={visibility ? 'text' : 'password'}
              value={values.password}
              helperText={touched.password && errors.password}
              onChange={handleChange('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setVisivility(!visibility)}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {visibility ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={80}
            />
          </FormControl>

          <Typography>
            <Link href="/account-confirm-email" color="primary">
              ¿Olvidaste tu contraseña?
            </Link>
          </Typography>

          <Box mt={2}>
            <Button
              color="primary"
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Iniciar sesión
            </Button>
            {errors.submit && (
              <Box mt={3}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}
          </Box>
          <br />
          <hr />
          <Box mt={2}>
            <Button
              color="primary"
              fullWidth
              size="large"
              variant="contained"
              href="/registry"
            >
              Registrar
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
}

LoginForm.propTypes = {
  className: PropTypes.string,
  onSubmitSuccess: PropTypes.func,
  getValues: PropTypes.func,
};

LoginForm.defaultProps = {
  onSubmitSuccess: () => {},
};

export default LoginForm;
