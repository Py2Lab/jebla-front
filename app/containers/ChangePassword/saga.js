import { call, put, takeLatest, all } from 'redux-saga/effects';
import request from 'utils/request';
import {
  addErrorMessage,
  addSuccessMessage,
} from 'containers/Notifications/actions';
import auth from 'utils/auth';
import * as constants from './constants';
export default function* defaultSaga() {
  yield takeLatest(constants.AUTENTICATE_EMAIL_INIT, autenticateEmaiSaga);
  yield takeLatest(constants.CHANGE_PASSWORD_INIT, changePasswordSaga);
}

export function* autenticateEmaiSaga(actions) {
  const body = {
    key: actions.key,
  };
  try {
    const requestURL = `${process.env.API_URL}/account-confirm-email/`;
    const response = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(body),
    });
    if (response) {
      const values = window.location.search;
      const urlParams = new URLSearchParams(values);
      yield put(addSuccessMessage(`Correo autenticado correctamente`));
      yield put({
        type: constants.AUTENTICATE_EMAIL_SUCCESS,
        response,
      });
      if (urlParams.get('invited').split('/')[0] === '1') {
        yield all([call(auth.setToken, response.token, true)]);
      } else {
        actions.history.push('/auth');
      }
    }
  } catch (error) {
    yield put(addErrorMessage(`Error al autenticar correo`));
    yield put({
      type: constants.AUTENTICATE_EMAIL_FAILED,
      error,
    });
  }
}

export function* loginSaga(email, password, history) {
  const body = {
    email,
    password,
  };
  try {
    const requestURL = `${process.env.API_URL}/rest-auth/login/`;
    const response = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (response.token) {
      yield call(login, response.token, response.user, history);
    }
  } catch (error) {
    yield put(addErrorMessage(`Error en credenciales, intentalo de nuevo`));
    yield put({
      type: constants.LOGIN_FAILED,
    });
  }
}

function* login(token, user, history) {
  // TODO: Implement remember me
  yield all([
    call(auth.setToken, token, true),
    call(auth.setUserInfo, user, true),
  ]);
  if (user.policy) {
    yield call(history.push, '/');
  } else {
    yield call(history.push, '/politicas-de-privacida');
  }
  yield put({
    type: constants.LOGIN_SUCCEED,
    user,
  });
}

export function* changePasswordSaga(actions) {
  if (actions.history.location.pathname.includes('account-confirm-email')) {
    const body = {
      password1: actions.password,
      password2: actions.passwordConfirm,
    };
    try {
      const requestURL = `${process.env.API_URL}/sign_up/set-password/`;
      const response = yield call(request, requestURL, {
        method: 'POST',
        headers: {
          Authorization: `JWT ${auth.getToken()}`,
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(body),
      });
      if (response) {
        const values = window.location.search;
        yield all([
          call(
            loginSaga,
            values.split('email=')[1],
            actions.password,
            actions.history,
          ),
        ]);
        yield put(addSuccessMessage(`Se modifico correctamente tu contraseña`));
        yield put({
          type: constants.SAVE_DATA_SUCCESS,
          response,
        });
      }
    } catch (error) {
      yield put(addErrorMessage(`Error`));
      yield put({
        type: constants.SAVE_DATA_FAILED,
        error,
      });
    }
  } else {
    const body = {
      uid: actions.code,
      token: actions.key,
      new_password1: actions.password,
      new_password2: actions.passwordConfirm,
    };
    try {
      const requestURL = `${
        process.env.API_URL
      }/rest-auth/password/reset/confirm/`;
      const response = yield call(request, requestURL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(body),
      });
      if (response) {
        yield put(
          addSuccessMessage(
            `Se modifico correctamente tu contraseña, inicia sesión nuevamente`,
          ),
        );
        actions.history.push('/auth');
      }
    } catch (error) {
      yield put(
        addErrorMessage(`La contraseña es muy similar a  nombre de usuario.`),
      );
      yield put({
        type: constants.CHANGE_PASSWORD_FAILED,
        error,
      });
    }
  }
}
