import React from 'react';
import clsx from 'clsx';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import {
  Box,
  Button,
  TextField,
  FormHelperText,
  makeStyles,
  Typography,
} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles(() => ({
  root: {},
}));
function LoginForm({ className, onSubmitSuccess, ...rest }) {
  const classes = useStyles();
  const [stateCheckbox, setStateChecbox] = React.useState({
    check: false,
  });

  const handleChangecheck = event => {
    setStateChecbox({
      ...stateCheckbox,
      [event.target.name]: event.target.checked,
    });
  };
  const termsLabel = (
    <Typography style={{ display: 'inline-block' }}>
      Acepto{' '}
      <a href="/terms" target="_blank">
        {`Terminos y Condiciones`}
      </a>
    </Typography>
  );
  const [visibility, setVisibility] = React.useState(false);
  const [visibility2, setVisibility2] = React.useState(false);

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleMouseDownPassword2 = event => {
    event.preventDefault();
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        passwordConfirm: '',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Must be a valid email')
          .max(255)
          .required('Email is required'),
        password: Yup.string()
          .max(255)
          .required('Password is required'),
        passwordConfirm: Yup.string()
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

          <FormControl
            variant="outlined"
            style={{ width: '100%', marginTop: '10px' }}
          >
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
                    onClick={() => setVisibility(!visibility)}
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

          <FormControl
            variant="outlined"
            style={{ width: '100%', marginTop: '10px' }}
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Contraseña
            </InputLabel>
            <OutlinedInput
              error={Boolean(touched.password && errors.password)}
              type={visibility2 ? 'text' : 'password'}
              value={values.passwordConfirm}
              helperText={touched.password && errors.password}
              onChange={handleChange('passwordConfirm')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setVisibility2(!visibility2)}
                    onMouseDown={handleMouseDownPassword2}
                    edge="end"
                  >
                    {visibility2 ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={80}
            />
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                checked={stateCheckbox.check}
                onChange={handleChangecheck}
                name="check"
                color="primary"
              />
            }
            label={termsLabel}
          />
          <Box mt={2}>
            <Button
              color="primary"
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              disabled={
                values.password !== values.passwordConfirm ||
                values.email === '' ||
                values.password === '' ||
                values.passwordConfirm === '' ||
                stateCheckbox.check === false
              }
            >
              Registrar
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
              href="/auth"
            >
              Inicio de sesión
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
