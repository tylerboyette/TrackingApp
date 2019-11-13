/* eslint-disable no-undef */
import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
// import history from 'browserHistory';

import * as CONSTANTS from './constants';
import {
  loginSuccess,
  loginError,
  signupSuccess,
  signupError,
  loginSocialSuccess,
  loginSocialError,
  emailVerifySuccess,
  emailVerifyError,
} from './actions';

export function* loginRequest(action) {
  try {
    const data = yield call(request, 'auth/login', 'POST', action.data);
    yield put(loginSuccess(data));
  } catch (err) {
    yield put(loginError(err));
  }
}

export function* signupRequest(action) {
  try {
    const data = yield call(request, 'auth/signup', 'POST', action.data);
    yield put(signupSuccess(data));
    notify.success('Your account has been created');
  } catch (err) {
    yield put(signupError(err));
  }
}

export function* loginSocialRequest(action) {
  try {
    const data = yield call(request, 'auth/login-social', 'POST', action.data);
    yield put(loginSocialSuccess(data));
  } catch (err) {
    yield put(loginSocialError(err));
  }
}
export function* emailRequest(action) {
  try {
    const data = yield call(request, 'auth/email-verify', 'POST', action.data);
    yield put(emailVerifySuccess(data));
  } catch (err) {
    yield put(emailVerifyError(err));
  }
}
export default function* authSaga() {
  yield takeLatest(CONSTANTS.LOGIN_REQUEST, loginRequest);
  yield takeLatest(CONSTANTS.SIGNUP_REQUEST, signupRequest);
  yield takeLatest(CONSTANTS.LOGIN_SOCIAL_REQUEST, loginSocialRequest);
  yield takeLatest(CONSTANTS.EMAIL_VERIFY_REQUEST, emailRequest);
}
