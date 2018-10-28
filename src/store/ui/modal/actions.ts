import { createStandardAction } from 'typesafe-actions';
import { Omit } from 'utility-types';
import { AtToastProps } from 'taro-ui/@types/toast';

const SHOW_TOAST = 'ui/SHOW_TOAST';
const HIDE_TOAST = 'ui/HIDE_TOAST';

export const showToast = createStandardAction(SHOW_TOAST).map(
  (payload: Omit<AtToastProps, 'isOpened'>) => ({
    payload: { isOpened: true, ...payload },
  })
);
export const hideToast = createStandardAction(HIDE_TOAST)<void>();
