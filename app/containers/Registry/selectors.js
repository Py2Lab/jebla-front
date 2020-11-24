import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the registry state domain
 */

const selectRegistryDomain = state => state.registry || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Registry
 */

const makeSelectRegistry = () =>
  createSelector(
    selectRegistryDomain,
    substate => substate,
  );

export default makeSelectRegistry;
export { selectRegistryDomain };
