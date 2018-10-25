import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';
import { all } from 'redux-saga/effects';

import { counter, counterSaga, CounterActions } from './counter';
import { ui, UIActions } from './ui';

export const root = combineReducers({
  counter,
  ui,
});

export type RootAction = CounterActions | UIActions;
export type RootState = StateType<typeof root>;

export function* rootSaga() {
  yield all([counterSaga()]);
}
