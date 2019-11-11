import * as CONSTANTS from './constants';

export function loginRequest(data) {
  return {
    type: CONSTANTS.LOGIN_REQUEST,
    data,
  };
}

export function loginSuccess(data) {
  return {
    type: CONSTANTS.LOGIN_SUCCESS,
    data,
  };
}

export function loginError(data) {
  return {
    type: CONSTANTS.LOGIN_ERROR,
    ...data,
  };
}

export function signupRequest(data) {
  return {
    type: CONSTANTS.SIGNUP_REQUEST,
    data,
  };
}

export function signupSuccess(data) {
  return {
    type: CONSTANTS.SIGNUP_SUCCESS,
    data,
  };
}

export function signupError(data) {
  return {
    type: CONSTANTS.SIGNUP_ERROR,
    ...data,
  };
}

export function logout() {
  return {
    type: CONSTANTS.LOGOUT,
  };
}

export function loginSocialRequest(data) {
  return {
    type: CONSTANTS.LOGIN_SOCIAL_REQUEST,
    data,
  };
}

export function loginSocialSuccess(data) {
  return {
    type: CONSTANTS.LOGIN_SOCIAL_SUCCESS,
    data,
  };
}

export function loginSocialError(data) {
  return {
    type: CONSTANTS.LOGIN_SOCIAL_ERROR,
    ...data,
  };
}
