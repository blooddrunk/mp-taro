import { put, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import { increment, incrementAsync } from './actions';

export function* counterSaga() {
  // worker
  function* incrementAsyncWorker() {
    yield delay(1000);
    yield put(increment());
  }

  // watcher
  function* watchIncremetnAsync() {
    yield takeLatest(incrementAsync.toString(), incrementAsyncWorker);
  }

  yield watchIncremetnAsync();
}
