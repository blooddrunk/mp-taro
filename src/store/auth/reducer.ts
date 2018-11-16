import { ActionType, getType } from 'typesafe-actions';
import produce from 'immer';

import * as authActions from './actions';
import { User } from './models';

export type AuthActions = ActionType<typeof authActions>;

export type AuthState = Readonly<{
  user: Readonly<User>;
  isLoginPending: boolean;
  loginError: Error | null;
}>;

export const authIntialState: AuthState = {
  user: {
    nickName: '...',
  },
  isLoginPending: false,
  loginError: null,
};

export const auth = produce<AuthState, AuthActions>((draft, action) => {
  switch (action.type) {
    case getType(authActions.loginActions.request):
      return {
        ...authIntialState,
        isLoginPending: true,
      };
    case getType(authActions.loginActions.success):
      draft.user = action.payload;
      draft.isLoginPending = false;
      return;
    case getType(authActions.loginActions.failure):
      draft.loginError = action.payload;
      return;
  }
}, authIntialState);
