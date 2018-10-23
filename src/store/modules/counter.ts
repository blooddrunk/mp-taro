import { createActions, handleActions } from 'redux-actions';
import produce from 'immer';
import { put, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';

export interface CounterState {
  value: number;
}

// action creators
export const actions = createActions(
  {},
  'INCREMENT',
  'DECREMENT',
  'INCREMENT_ASYNC'
);

// reducer
export const counter = handleActions<CounterState>(
  {
    [actions.increment.toString()]: produce(draft => {
      draft.value += 1;
    }),
    [actions.decrement.toString()]: produce(draft => {
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
    yield put(actions.increment());
  }

  // watcher
  function* watchIncremetnAsync() {
    yield takeLatest(actions.incrementAsync.toString(), incrementAsyncWorker);
  }

  yield watchIncremetnAsync();
}
