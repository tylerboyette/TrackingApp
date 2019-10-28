/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAuth = state => state.auth || initialState;

const makeSelectUser = () =>
  createSelector(
    selectAuth,
    homeState => homeState.username,
  );

export { selectAuth, makeSelectUser };
