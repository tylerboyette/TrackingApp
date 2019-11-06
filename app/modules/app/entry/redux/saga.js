import { call, put, takeLatest, select } from 'redux-saga/effects';
import request from 'utils/request';
// import history from 'browserHistory';
import * as CONSTANTS from './constants';
import {
  entryListSuccess,
  entryListError,
  entryReportSuccess,
  entryReportError,
  entryLoadSuccess,
  entryLoadError,
  entrySaveSuccess,
  entrySaveError,
  entryDeleteSuccess,
  entryDeleteError,
} from './actions';
import { selectEntry } from './selectors';

export function* entryListRequest() {
  try {
    const data = yield call(request, 'entries', 'GET', null, true);
    yield put(entryListSuccess(data));
  } catch (err) {
    yield put(entryListError(err));
  }
}

export function* entryReportRequest() {
  try {
    const data = yield call(request, 'entries/report', 'GET', null, true);
    yield put(entryReportSuccess(data));
  } catch (err) {
    yield put(entryReportError(err));
  }
}

export function* entryLoadRequest(action) {
  try {
    const data = yield call(request, `entries/${action.id}`, 'GET', null, true);
    yield put(entryLoadSuccess(data));
  } catch (err) {
    yield put(entryLoadError(err));
  }
}

export function* entryDeleteRequest(action) {
  try {
    const data = yield call(
      request,
      `entries/${action.id}`,
      'DELETE',
      null,
      true,
    );
    yield put(entryDeleteSuccess(action.id, data));
    notify.success('Entry Deleted');
  } catch (err) {
    yield put(entryDeleteError(err));
  }
}

export function* entrySaveRequest(action) {
  try {
    const state = yield select();
    const entry = selectEntry(state);
    const requestData = entry.entry.data;
    const { id } = entry.entry;
    let responseData = null;

    if (id === 'new') {
      responseData = yield call(
        request,
        'entries',
        'POST',
        {
          body: { ...requestData },
        },
        true,
      );
    } else {
      responseData = yield call(
        request,
        `entries/${id}`,
        'PUT',
        {
          body: { ...requestData },
        },
        true,
      );
    }

    notify.success('Entry saved');
    yield put(entrySaveSuccess(responseData));
  } catch (err) {
    yield put(entrySaveError(err));
  }
}
export default function* userSaga() {
  yield takeLatest(CONSTANTS.ENTRY_LIST_REQUEST, entryListRequest);
  yield takeLatest(CONSTANTS.ENTRY_REPORT_REQUEST, entryReportRequest);
  yield takeLatest(CONSTANTS.ENTRY_LOAD_REQUEST, entryLoadRequest);
  yield takeLatest(CONSTANTS.ENTRY_SAVE_REQUEST, entrySaveRequest);
  yield takeLatest(CONSTANTS.ENTRY_DELETE_REQUEST, entryDeleteRequest);
}
