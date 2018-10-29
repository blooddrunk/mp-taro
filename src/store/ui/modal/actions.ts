import { createStandardAction } from 'typesafe-actions';
import { Omit } from 'utility-types';
import { AtModalProps } from 'taro-ui/@types/modal';

const SHOW_MODAL = 'ui/SHOW_MODAL';
const HIDE_MODAL = 'ui/HIDE_MODAL';

export const showModal = createStandardAction(SHOW_MODAL).map(
  (payload: Omit<AtModalProps, 'isOpened'>) => ({
    payload: { isOpened: true, ...payload },
  })
);
export const hideModal = createStandardAction(HIDE_MODAL)<void>();
