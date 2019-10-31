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
  },
  user: {
    id: '',
    data: {},
    error: [],
  },
};

/* eslint-disable default-case, no-param-reassign */
const userReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CONSTANTS.USER_LIST_SUCCESS:
        draft.users.list = action.data;
        break;
    }
  });

export default userReducer;
