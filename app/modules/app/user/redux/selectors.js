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
const makeSelectUser = () =>
  createSelector(
    selectUser,
    userState => userState.user.data,
  );
const makeSelectUserListLoading = () =>
  createSelector(
    selectUser,
    userState => userState.users.loading,
  );

const makeSelectUserLoading = () =>
  createSelector(
    selectUser,
    userState => userState.user.loading,
  );
export {
  selectUser,
  makeSelectUserList,
  makeSelectUserListLoading,
  makeSelectUser,
  makeSelectUserLoading,
};
