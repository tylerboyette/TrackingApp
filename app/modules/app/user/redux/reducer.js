/* eslint-disable no-underscore-dangle */
import produce from 'immer';
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
      case CONSTANTS.USER_LIST_REQUEST:
        draft.users.loading = true;
        break;
      case CONSTANTS.USER_LIST_SUCCESS:
        draft.users.list = action.data;
        draft.users.loading = false;
        break;
      case CONSTANTS.USER_LIST_ERROR:
        draft.users.loading = false;
        break;

      case CONSTANTS.USER_LOAD_REQUEST:
        draft.user.loading = true;
        break;
      case CONSTANTS.USER_LOAD_SUCCESS:
        draft.user.data = action.data;
        draft.user.id = action.data._id;
        draft.user.loading = false;
        break;
      case CONSTANTS.USER_LOAD_ERROR:
        draft.user.loading = false;
        break;

      case CONSTANTS.LOAD_NEW_USER:
        draft.user.data = newUser;
        draft.user.id = 'new';
        draft.user.error = [];
        draft.user.loading = false;
        break;

      case CONSTANTS.UPDATE_USER_FIELD:
        draft.user.data[action.field] = action.value;
        break;
      case CONSTANTS.USER_DELETE_REQUEST:
        draft.users.loading = true;
        draft.user.loading = true;
        break;

      case CONSTANTS.USER_DELETE_SUCCESS: {
        const userList = draft.users.list;
        const filteredList = userList.filter(user => user._id !== action.id);
        draft.users.list = filteredList;
        draft.users.loading = false;
        draft.user.loading = false;
        break;
      }
      case CONSTANTS.USER_DELETE_ERROR:
        draft.users.loading = false;
        draft.user.loading = false;
        break;
    }
  });

export default userReducer;
