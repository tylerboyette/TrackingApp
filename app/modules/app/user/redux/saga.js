/* eslint-disable no-undef */
import { call, put, takeLatest, select } from 'redux-saga/effects';
import request from 'utils/request';
// import history from 'browserHistory';
import * as CONSTANTS from './constants';
import {
  userListSuccess,
  userListError,
  userLoadSuccess,
  userLoadError,
  userDeleteSuccess,
  userDeleteError,
  userSaveSuccess,
  userSaveError,
  profileSaveSuccess,
  profileSaveError,
  memberUpgradeSuccess,
} from './actions';

import { selectUser } from './selectors';

export function* userListRequest() {
  try {
    const data = yield call(request, 'users', 'GET', null, true);
    yield put(userListSuccess(data));
  } catch (err) {
    yield put(userListError(err));
  }
}
export function* userLoadRequest(action) {
  try {
    const data = yield call(request, `users/${action.id}`, 'GET', null, true);
    yield put(userLoadSuccess(data));
  } catch (err) {
    yield put(userLoadError(err));
  }
}

export function* userDeleteRequest(action) {
  try {
    const data = yield call(
      request,
      `users/${action.id}`,
      'DELETE',
      null,
      true,
    );
    yield put(userDeleteSuccess(action.id, data));
  } catch (err) {
    yield put(userDeleteError(err));
  }
}

export function* userSaveRequest(action) {
  try {
    const state = yield select();
    const user = selectUser(state);
    const requestData = user.user.data;
    const { id } = user.user;
    let responseData = null;
    if (id === 'new') {
      responseData = yield call(
        request,
        'users',
        'POST',
        {
          body: { ...requestData },
          success: action.data.success,
          failure: action.data.failure,
        },
        true,
      );
    } else {
      responseData = yield call(
        request,
        `users/${id}`,
        'PUT',
        {
          body: { ...requestData },
          success: action.data.success,
          failure: action.data.failure,
        },
        true,
      );
    }

    yield put(userSaveSuccess(responseData));

    notify.success('User saved');
  } catch (err) {
    yield put(userSaveError(err));
  }
}
export function* saveProfile(action) {
  try {
    const data = yield call(request, `profile/me`, 'POST', action.data, true);

    yield put(profileSaveSuccess(data));
    notify.success('Profile is updated');
  } catch (err) {
    yield put(profileSaveError(err));
    notify.error('Error', err);
  }
}
export function* upgradeMember(action) {
  try {
    const data = yield call(request, `member`, 'POST', action.data, true);

    yield put(memberUpgradeSuccess(data));
    notify.success('MemberShip is upgraded');
  } catch (err) {
    notify.error('Error', err);
  }
}

export default function* userSaga() {
  yield takeLatest(CONSTANTS.USER_LIST_REQUEST, userListRequest);
  yield takeLatest(CONSTANTS.USER_LOAD_REQUEST, userLoadRequest);
  yield takeLatest(CONSTANTS.USER_SAVE_REQUEST, userSaveRequest);
  yield takeLatest(CONSTANTS.USER_DELETE_REQUEST, userDeleteRequest);
  yield takeLatest(CONSTANTS.SAVE_PROFILE_REQUEST, saveProfile);
  yield takeLatest(CONSTANTS.UPGRADE_MEMBER_REQUEST, upgradeMember);
}
