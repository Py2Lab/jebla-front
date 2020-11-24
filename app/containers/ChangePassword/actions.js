/*
 *
 * ChangePassword actions
 *
 */

import * as constants from './constants';

export function defaultAction() {
  return {
    type: constants.DEFAULT_ACTION,
  };
}

export function changePassword(code, key, password, passwordConfirm, history) {
  return {
    type: constants.CHANGE_PASSWORD_INIT,
    code,
    key,
    password,
    passwordConfirm,
    history,
  };
}

export function autenticateEmail(key, history) {
  return {
    type: constants.AUTENTICATE_EMAIL_INIT,
    key,
    history,
  };
}
