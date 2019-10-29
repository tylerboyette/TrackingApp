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

const newUser = {
  firstName: '',
  lastName: '',
  email: '',
};

export const initialState = {
  users: {
    list: [],
    loading: false,
  },
  user: {
    id: '',
    data: {},
    error: [],
    loading: false,
  },
};

/* eslint-disable default-case, no-param-reassign */
const userReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CONSTANTS.LOAD_NEW_USER:
        draft.user = {
          data: newUser,
          id: 'new',
          error: [],
          loading: false,
        };
        break;
      case CONSTANTS.USER_LIST_REQUEST:
        draft.users.loading = true;
        break;

      case CONSTANTS.USER_LIST_SUCCESS:
        console.log('USER_LIST_SUCCESS');
        draft.users.list = action.data;
        draft.users.loading = false;
        break;
      case CONSTANTS.USER_LIST_ERROR:
        draft.users.loading = false;
        break;
      case CONSTANTS.USER_DELETE_REQUEST:
        draft.users.loading = true;
        draft.user.loading = true;
        break;
      case CONSTANTS.USER_DELETE_SUCCESS:
        {
          const userList = state.users.list;
          const filteredList = userList.filter(user => user._id !== action.id);
          draft.users.list = filteredList;
          draft.users.loading = false;
          draft.user.loading = false;
        }
        break;
      case CONSTANTS.USER_DELETE_ERROR:
        draft.users.loading = false;
        draft.user.loading = false;
        break;
      case CONSTANTS.USER_LOAD_REQUEST:
        draft.user.loading = true;
        break;
      case CONSTANTS.USER_LOAD_SUCCESS:
        draft.user.data = action.data;
        draft.user.id = action.data._id;
        draft.user.loading = action.false;
        break;
      case CONSTANTS.USER_LOAD_ERROR:
        draft.user.loading = false;
        break;
      case CONSTANTS.USER_SAVE_REQUEST:
        draft.user.loading = true;
        draft.user.error = [];
        break;
      case CONSTANTS.USER_SAVE_SUCCESS:
        draft.user.id = action.data._id;
        draft.user.data.id = action.data._id;
        draft.user.loading = false;
        break;
      case CONSTANTS.USER_SAVE_ERROR:
        draft.user.loading = false;
        draft.user.error = action.data.error;
        break;
      case CONSTANTS.UPDATE_USER_FIELD:
        draft.user.data[action.field] = action.value;
        break;
    }
  });

export default userReducer;
