import { put, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import { increment, INCREMENT_ASYNC } from './actions';

export function* counterSaga() {
  // worker
  function* incrementAsyncWorker() {
    yield delay(1000);
    yield put(increment());
  }

  // watcher
  function* watchIncremetnAsync() {
    yield takeLatest(INCREMENT_ASYNC, incrementAsyncWorker);
  }

  yield watchIncremetnAsync();
}
