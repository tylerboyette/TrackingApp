/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectUser = state => state.app.user;

const makeSelectUserList = () =>
  createSelector(
    selectUser,
    userState => userState.users.list,
  );
export { selectUser, makeSelectUserList };
