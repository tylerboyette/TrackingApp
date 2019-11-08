import { all } from 'redux-saga/effects';
import userSaga from '../user/redux/saga';
import entrySaga from '../entry/redux/saga';

export default function* appSaga() {
  yield all([userSaga(), entrySaga()]);
}
