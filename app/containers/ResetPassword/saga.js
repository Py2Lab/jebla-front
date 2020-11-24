import { takeLatest, call, put } from 'redux-saga/effects';
import request from 'utils/request';
import {
  addErrorMessage,
  addSuccessMessage,
} from 'containers/Notifications/actions';
import * as constants from './constants';

// Individual exports for testing
export default function* defaultSaga() {
  yield takeLatest(constants.AUTENTICATE_EMAIL_INIT, autenticateEmaiSaga);
  yield takeLatest(constants.RESET_PASSWORD_INIT, resetPasswordSaga);
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
      yield put(addSuccessMessage(`Correo autenticado correctamente`));
      yield put({
        type: constants.AUTENTICATE_EMAIL_SUCCESS,
        response,
      });
    }
  } catch (error) {
    yield put(addErrorMessage(`Error al autenticar correo`));
    yield put({
      type: constants.AUTENTICATE_EMAIL_FAILED,
      error,
    });
  }
}

export function* resetPasswordSaga(actions) {
  const body = {
    email: actions.email,
  };
  try {
    const requestURL = `${process.env.API_URL}/rest-auth/password/reset/`;
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
        addSuccessMessage(`Se te envio un correo para cambiar tu contraseña`),
      );
      actions.history.push('/auth');
      yield put({
        type: constants.RESET_PASSWORD_SUCCESS,
        response,
      });
    }
  } catch (error) {
    yield put(addErrorMessage(`Error al autenticar correo`));
    yield put({
      type: constants.RESET_PASSWORD_FAILED,
      error,
    });
  }
}
