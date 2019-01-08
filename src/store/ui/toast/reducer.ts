import { ActionType, getType } from 'typesafe-actions';
import produce from 'immer';
import { AtToastProps } from 'taro-ui/@types/toast';

import * as actions from './actions';

export type ToastActions = ActionType<typeof actions>;

export type ToastState = Readonly<AtToastProps>;

export const toastInitialState: ToastState = {
  isOpened: false,
  hasMask: true,
};

export const toast = produce((draft, action: ToastActions) => {
  switch (action.type) {
    case getType(actions.showToast):
      return {
        ...draft,
        ...action.payload,
      } as ToastState;
    case getType(actions.hideToast):
      return toastInitialState;
  }
}, toastInitialState);
