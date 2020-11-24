/*
 *
 * Registry actions
 *
 */

import * as constants from './constants';

export function defaultAction() {
  return {
    type: constants.DEFAULT_ACTION,
  };
}

export function submit(user, password, history) {
  return {
    type: constants.REGISTER_INIT,
    user,
    password,
    history,
  };
}
