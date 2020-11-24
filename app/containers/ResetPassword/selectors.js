import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the authFormConfirmed state domain
 */

const selectAuthFormConfirmedDomain = state =>
  state.authFormConfirmed || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AuthFormConfirmed
 */

const makeSelectAuthFormConfirmed = () =>
  createSelector(
    selectAuthFormConfirmedDomain,
    substate => substate,
  );

export default makeSelectAuthFormConfirmed;
export { selectAuthFormConfirmedDomain };
