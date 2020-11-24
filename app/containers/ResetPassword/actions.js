/*
 *
 * AuthFormConfirmed actions
 *
 */

import * as constants from './constants';

export function defaultAction() {
  return {
    type: constants.DEFAULT_ACTION,
  };
}

export function autenticateEmail(key) {
  return {
    type: constants.AUTENTICATE_EMAIL_INIT,
    key,
  };
}

export function resetPassword(email, history) {
  return {
    type: constants.RESET_PASSWORD_INIT,
    email,
    history,
  };
}
