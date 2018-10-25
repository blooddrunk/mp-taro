import { combineReducers } from 'redux';

import { toast, ToastActions } from './toast';

export const ui = combineReducers({
  toast,
});

export type UIActions = ToastActions;

export * from './toast';
