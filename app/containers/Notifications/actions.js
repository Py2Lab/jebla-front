/*
 *
 * Notifications actions
 *
 */

import * as constants from './constants';

export function defaultAction() {
  return {
    type: constants.DEFAULT_ACTION,
  };
}

export function addErrorMessage(message, duration = 3) {
  return {
    type: constants.ADD_ERROR_MESSAGE,
    payload: {
      message,
      duration,
    },
  };
}

export function addSuccessMessage(message, duration = 3) {
  return {
    type: constants.ADD_SUCCESS_MESSAGE,
    payload: {
      message,
      duration,
    },
  };
}

export function addWarningMessage(message, duration = 3) {
  return {
    type: constants.ADD_WARNING_MESSAGE,
    payload: {
      message,
      duration,
    },
  };
}

export function addInfoMessage(message, duration = 3) {
  return {
    type: constants.ADD_INFO_MESSAGE,
    payload: {
      message,
      duration,
    },
  };
}

export function clearMessage() {
  return {
    type: constants.CLEAR_MESSAGE,
  };
}
