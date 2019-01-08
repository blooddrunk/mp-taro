import { ActionType, getType } from 'typesafe-actions';
import produce from 'immer';
import { AtModalProps } from 'taro-ui/@types/modal';

import * as actions from './actions';

export type ModalActions = ActionType<typeof actions>;

export type ModalState = Readonly<AtModalProps>;

export const modalInitialState: ModalState = {
  isOpened: false,
};

export const modal = produce((draft, action: ModalActions) => {
  switch (action.type) {
    case getType(actions.showModal):
      return {
        ...draft,
        ...action.payload,
      } as ModalState;
    case getType(actions.hideModal):
      return modalInitialState;
  }
}, modalInitialState);
