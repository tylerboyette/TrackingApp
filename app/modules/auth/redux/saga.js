import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
// import history from 'browserHistory';
import * as CONSTANTS from './constants';
import {
  loginSuccess,
  loginError,
  signupSuccess,
  signupError,
} from './actions';

export function* loginRequest(action) {
  console.log(action);
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
    // notify.success('Your account has been created');
    // history.push('/login');
  } catch (err) {
    yield put(signupError(err));
  }
}

export default function* authSaga() {
  yield takeLatest(CONSTANTS.LOGIN_REQUEST, loginRequest);
  yield takeLatest(CONSTANTS.SIGNUP_REQUEST, signupRequest);
}
