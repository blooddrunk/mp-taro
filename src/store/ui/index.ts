import { combineReducers } from 'redux';

import { toast, ToastActions } from './toast';
import { modal, ModalActions } from './modal';
import { tabbar, TabbarActions } from './tabbar';

export const ui = combineReducers({
  toast,
  modal,
  tabbar,
});

export type UIActions = ToastActions | ModalActions | TabbarActions;

export * from './toast';
export * from './modal';
export * from './tabbar';
