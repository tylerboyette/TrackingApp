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
} from './actions';

export function* loginRequest(action) {
  try {
    const data = yield call(request, 'auth/login', 'POST', action.data);
    yield put(loginSuccess(data));
  } catch (err) {
    yield put(loginError(err));
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

export function* signupRequest(action) {
  try {
    const data = yield call(request, 'auth/signup', 'POST', action.data);
    yield put(signupSuccess(data));
    notify.success('Your account has been created');
  } catch (err) {
    yield put(signupError(err));
  }
}

export default function* authSaga() {
  yield takeLatest(CONSTANTS.LOGIN_REQUEST, loginRequest);
  yield takeLatest(CONSTANTS.LOGIN_SOCIAL_REQUEST, loginSocialRequest);
  yield takeLatest(CONSTANTS.SIGNUP_REQUEST, signupRequest);
}
