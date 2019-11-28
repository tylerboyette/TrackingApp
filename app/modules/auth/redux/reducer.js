import produce from 'immer';
import * as CONSTANTS from './constants';
import {
  SAVE_PROFILE_SUCCESS,
  UPGRADE_MEMBER_SUCCESS,
} from '../../app/user/redux/constants';
// The initial state of the App
export const initialState = {
  currentUser: null,
  message: null,
};

/* eslint-disable default-case, no-param-reassign */
const authReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CONSTANTS.LOGIN_SUCCESS:
        draft.currentUser = action.data;
        break;
      case CONSTANTS.LOGIN_SOCIAL_SUCCESS:
        draft.currentUser = action.data;
        break;
      case CONSTANTS.LOGOUT:
        draft.currentUser = null;
        break;
      case SAVE_PROFILE_SUCCESS:
        draft.currentUser = action.data;
        break;
      case CONSTANTS.EMAIL_VERIFY_SUCCESS:
        draft.message = action.data.message;
        break;
      case CONSTANTS.EMAIL_VERIFY_ERROR:
        draft.message = action.data.message;
        break;
      case UPGRADE_MEMBER_SUCCESS:
        console.log('hello membership');
        break;
    }
  });

export default authReducer;
