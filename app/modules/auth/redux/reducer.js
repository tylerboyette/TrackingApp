import produce from 'immer';
import * as CONSTANTS from './constants';

// The initial state of the App
export const initialState = {
  currentUser: null,
};

/* eslint-disable default-case, no-param-reassign */
const authReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CONSTANTS.LOGIN_SUCCESS:
        draft.currentUser = action.data;
        break;
      case CONSTANTS.LOGOUT:
        draft.currentUser = null;
        break;
    }
  });

export default authReducer;
