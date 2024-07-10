/*
 *
 * FormTerminacionLaboral actions
 *
 */

import * as constants from './constants';

export function defaultAction() {
  return {
    type: constants.DEFAULT_ACTION,
  };
}

export function getAddresses() {
  return {
    type: constants.GET_ADDRESSES_INIT,
  };
}

export function getEnterprises() {
  return {
    type: constants.GET_ENTERPRISES_INIT,
  };
}
