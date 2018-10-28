import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';
import { all } from 'redux-saga/effects';
import { END } from 'redux-saga';

import { counter, counterSaga, CounterActions } from './counter';
import { ui, UIActions } from './ui';
import { auth, authSaga, AuthActions } from './auth';

export const root = combineReducers({
  counter,
  ui,
  auth,
});

export type RootAction = END | CounterActions | UIActions | AuthActions;
export type RootState = StateType<typeof root>;

export function* rootSaga() {
  yield all([counterSaga(), authSaga()]);
}
