import { combineReducers } from 'redux';

import { counter } from './counter';
import { ui } from './ui';

export const rootReducer = combineReducers({
  counter: counter,
  ui: ui,
});
