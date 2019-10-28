/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import * as CONSTANTS from './constants';
import {
  loginSuccess,
  loginError,
  signupSuccess,
  signupError,
} from './actions';

/**
 * Github repos request/response handler
 */
export function* loginRequest(action) {
  try {
    console.log(action);
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
    // notify.success('Your account has been created');
    // history.push('/login');
  } catch (err) {
    yield put(signupError(err));
  }
}
/**
 * Root saga manages watcher lifecycle
 */
export default function* authSaga() {
  yield takeLatest(CONSTANTS.LOGIN_REQUEST, loginRequest);
  yield takeLatest(CONSTANTS.SIGNUP_REQUEST, signupRequest);
}
