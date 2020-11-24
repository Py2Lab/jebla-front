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
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {},
}));

function LoginForm({ className, onSubmitSuccess, ...rest }) {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        password: '',
        password_confirm: '',
      }}
      validationSchema={Yup.object().shape({
        password_confirm: Yup.string()
          .max(255)
          .required('Password is required'),
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
            error={Boolean(touched.password && errors.password)}
            fullWidth
            helperText={touched.password && errors.password}
            label="Contraseña"
            margin="normal"
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.password && errors.password)}
            fullWidth
            helperText={touched.password && errors.password}
            label="Confirmar Contraseña"
            margin="normal"
            name="password_confirm"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.password_confirm}
            variant="outlined"
          />
          <Box mt={2}>
            <Button
              color="primary"
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              disabled={
                values.password !== values.password_confirm ||
                values.password === '' ||
                values.password_confirm === ''
              }
            >
              Cambiar contraseña
            </Button>
            {errors.submit && (
              <Box mt={3}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}
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
