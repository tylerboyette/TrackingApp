/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { REHYDRATE } from 'redux-persist';
import * as CONSTANTS from './constants';

// The initial state of the App

export const initialState = {
  persistLoaded: false,
  loading: false,
  notification: {
    type: '',
    visible: false,
    heading: '',
    message: '',
  },
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case REHYDRATE:
        draft.persistLoaded = true;
        break;
      case CONSTANTS.SET_API_LOADING:
        draft.loading = action.value;
        break;

      case CONSTANTS.SET_GLOBAL_NOTIFICATION:
        draft.notification = {
          type: action.messageType,
          visible: action.visible,
          heading: action.heading,
          message: action.message,
        };
        break;
    }
  });

export default appReducer;
