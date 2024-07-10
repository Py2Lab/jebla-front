/*
 *
 * FormTerminacionLaboral reducer
 *
 */
import produce from 'immer';
import * as constants from './constants';

export const initialState = {
  addresses: [],
  enterprises: [],
};

/* eslint-disable default-case, no-param-reassign */
const formTerminacionLaboralReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case constants.DEFAULT_ACTION:
        break;
      case constants.GET_ADDRESSES_SUCCEES:
        draft.addresses = action.response;
        break;
      case constants.GET_ENTERPRISES_SUCCEES:
        draft.enterprises = action.response;
        break;
    }
  });

export default formTerminacionLaboralReducer;
