import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import auth from 'utils/auth';
import { addErrorMessage } from 'containers/Notifications/actions';
import * as constants from './constants';
export default function* defaultSaga() {
  yield takeLatest(constants.GET_ADDRESSES_INIT, getAddressesSaga);
  yield takeLatest(constants.GET_ENTERPRISES_INIT, getEnterprisesSaga);
}

export function* getAddressesSaga() {
  try {
    const requestURL = `${process.env.API_URL}/sign_up/addresses/`;
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${auth.getToken()}`,
      },
    });
    if (response) {
      yield put({ type: constants.GET_ADDRESSES_SUCCEES, response });
    }
  } catch (error) {
    yield put(addErrorMessage(`Error en credenciales, intentalo de nuevo`));
    yield put({
      type: constants.LOGIN_FAILED,
    });
  }
}

export function* getEnterprisesSaga() {
  try {
    const requestURL = `${process.env.API_URL}/sign_up/sucursales/`;
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${auth.getToken()}`,
      },
    });
    if (response) {
      yield put({ type: constants.GET_ENTERPRISES_SUCCEES, response });
    }
  } catch (error) {
    yield put(addErrorMessage(`Error en credenciales, intentalo de nuevo`));
    yield put({
      type: constants.LOGIN_FAILED,
    });
  }
}
