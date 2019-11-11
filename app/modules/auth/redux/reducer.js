import produce from 'immer';
import * as CONSTANTS from './constants';
import { SAVE_PROFILE_SUCCESS } from '../../app/user/redux/constants';
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
      case CONSTANTS.LOGIN_SOCIAL_SUCCESS:
        console.log('reducer', action);
        draft.currentUser = action.data;
        break;
      case CONSTANTS.LOGOUT:
        draft.currentUser = null;
        break;
      case SAVE_PROFILE_SUCCESS:
        draft.currentUser = action.data;
        break;
    }
  });

export default authReducer;
