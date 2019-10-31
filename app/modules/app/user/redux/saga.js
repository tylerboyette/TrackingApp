import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
// import history from 'browserHistory';
import * as CONSTANTS from './constants';
import { userListSuccess, userListError } from './actions';

export function* userListRequest(action) {
  try {
    const data = yield call(request, 'users', 'GET', null, true);
    yield put(userListSuccess(data));
  } catch (err) {
    yield put(userListError(err));
  }
}

export default function* userSaga() {
  yield takeLatest(CONSTANTS.USER_LIST_REQUEST, userListRequest);
}
