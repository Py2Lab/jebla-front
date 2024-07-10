import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the formTerminacionLaboral state domain
 */

const selectFormTerminacionLaboralDomain = state =>
  state.formTerminacionLaboral || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by FormTerminacionLaboral
 */

const makeSelectFormTerminacionLaboral = () =>
  createSelector(
    selectFormTerminacionLaboralDomain,
    substate => substate,
  );

export default makeSelectFormTerminacionLaboral;
export { selectFormTerminacionLaboralDomain };
