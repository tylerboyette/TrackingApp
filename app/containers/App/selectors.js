/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = state => state.global;

const selectRoute = state => state.router;

const selectAuth = state => state.auth;

const makeSelectCurrentUser = () =>
  createSelector(
    selectAuth,
    globalState => globalState.currentUser,
  );

const makeSelectLoading = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.loading,
  );

const makeSelectPersisting = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.persisted,
  );

const makeSelectPersistLoaded = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.persistLoaded,
  );

const makeSelectNotification = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.notification,
  );

const makeSelectLocation = () =>
  createSelector(
    selectRoute,
    routeState => routeState.location,
  );

export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectNotification,
  makeSelectLocation,
  makeSelectPersistLoaded,
};
