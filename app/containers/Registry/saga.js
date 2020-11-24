import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import {
  addErrorMessage,
  addSuccessMessage,
} from 'containers/Notifications/actions';
import * as constants from './constants';
export default function* defaultSaga() {
  yield takeLatest(constants.REGISTER_INIT, registrySaga);
}

export function* registrySaga(action) {
  const body = {
    email: action.user,
    password1: action.password,
    password2: action.password,
    role: 'administrador',
    invited: 0,
  };
  try {
    const requestURL = `${process.env.API_URL}/rest-auth/registration/`;
    const response = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (response) {
      yield put(
        addSuccessMessage(
          `Se envio un link de confirmación, a tu correo electronico`,
        ),
      );
      yield call(action.history.push, '/auth');
    }
  } catch (error) {
    yield call(action.history.push, '/registry');
    yield put(addErrorMessage(`Correo ya registrado, intentalo con uno nuevo`));
    yield put({
      type: constants.REGISTER_FAILED,
    });
  }
}
