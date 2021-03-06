import { createStandardAction } from 'typesafe-actions';

import { ToastPayload } from './models';

const SHOW_TOAST = 'ui/SHOW_TOAST';
const HIDE_TOAST = 'ui/HIDE_TOAST';

export const showToast = createStandardAction(SHOW_TOAST).map(
  (payload: ToastPayload) => ({
    payload: { isOpened: true, ...payload },
  })
);
export const hideToast = createStandardAction(HIDE_TOAST)<void>();
