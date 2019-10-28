/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { fromJS } from 'immutable';
import { REHYDRATE } from 'redux-persist';
import * as CONSTANTS from './constants';

// The initial state of the App
const initialState = fromJS({
  persistLoaded: false,
  loading: false,
  notification: {
    type: '',
    visible: false,
    heading: '',
    message: '',
  },
});

/* eslint-disable default-case, no-param-reassign */

function appReducer(state = initialState, action) {
  switch (action.type) {
    case REHYDRATE:
      return state.set('persistLoaded', true);
    case CONSTANTS.SET_API_LOADING:
      return state.set('loading', action.value);
    case CONSTANTS.SET_GLOBAL_NOTIFICATION:
      return state.set(
        'notification',
        fromJS({
          type: action.messageType,
          visible: action.visible,
          heading: action.heading,
          message: action.message,
        }),
      );
    default:
      return state;
  }
}

export default appReducer;
