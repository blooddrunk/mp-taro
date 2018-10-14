import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { effects, delay } from 'redux-saga/dist/redux-saga';

const { put, takeLatest } = effects;

// action creators
export const increment = createAction('INCREMENT');
export const decrement = createAction('DECREMENT');
export const incrementAsync = createAction('INCREMENT_ASYNC');

// reducer
export const counter = handleActions(
  {
    [increment.toString()]: produce(draft => {
      draft.value += 1;
    }),
    [decrement.toString()]: produce(draft => {
      draft.value -= 1;
    }),
  },
  { value: 0 }
);

// saga
export function* sagas() {
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
