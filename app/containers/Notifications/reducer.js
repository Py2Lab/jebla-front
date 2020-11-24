/*
 *
 * Notifications reducer
 *
 */
import produce from 'immer';
import * as constants from './constants';

// export const initialState = fromJS({
//   message: '',
//   type: '',
//   duration: 3,
// });
export const initialState = {
  message: '',
  type: '',
  duration: 3,
};
/* eslint-disable default-case, no-param-reassign */
const notificationsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case constants.DEFAULT_ACTION:
        break;
      case constants.ADD_ERROR_MESSAGE:
        draft.duration = action.payload.duration;
        draft.message = action.payload.message;
        draft.type = 'error';
        break;
      case constants.ADD_SUCCESS_MESSAGE:
        draft.duration = action.payload.duration;
        draft.message = action.payload.message;
        draft.type = 'success';
        break;
      case constants.ADD_WARNING_MESSAGE:
        draft.duration = action.payload.duration;
        draft.message = action.payload.message;
        draft.type = 'warning';
        break;
      case constants.ADD_INFO_MESSAGE:
        draft.duration = action.payload.duration;
        draft.message = action.payload.message;
        draft.type = 'info';
        break;
      case constants.CLEAR_MESSAGE:
        draft.duration = 3;
        draft.message = '';
        draft.type = '';
        break;
    }
  });
export default notificationsReducer;
