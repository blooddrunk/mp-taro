import { createActions, handleActions } from 'redux-actions';
import produce from 'immer';
import { AtToastProps } from 'taro-ui/@types/toast';

// action creators
export const actions = createActions<AtToastProps>(
  {},
  'SHOW_TOAST',
  'HIDE_TOAST'
);

// reducer
export const toast = handleActions<AtToastProps>(
  {
    [actions.showToast.toString()]: produce<AtToastProps>(
      (draft, { payload }) => ({
        ...draft,
        ...payload,
      })
    ),
    [actions.hideToast.toString()]: produce<AtToastProps>(draft => {
      draft.isOpened = false;
    }),
  },
  { isOpened: false }
);
