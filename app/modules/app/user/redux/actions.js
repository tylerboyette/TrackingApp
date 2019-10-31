import * as CONSTANTS from './constants';

export function userListRequest() {
  return {
    type: CONSTANTS.USER_LIST_REQUEST,
  };
}

export function userListSuccess(data) {
  return {
    type: CONSTANTS.USER_LIST_SUCCESS,
    data,
  };
}

export function userListError(data) {
  return {
    type: CONSTANTS.USER_LIST_ERROR,
    data,
  };
}
