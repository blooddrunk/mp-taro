import { createStandardAction } from 'typesafe-actions';
import { AtToastProps } from 'taro-ui/@types/toast';

const SHOW_TOAST = 'ui/SHOW_TOAST';
const HIDE_TOAST = 'ui/HIDE_TOAST';

export const showToast = createStandardAction(SHOW_TOAST)<AtToastProps>();
export const hideToast = createStandardAction(HIDE_TOAST)<void>();
