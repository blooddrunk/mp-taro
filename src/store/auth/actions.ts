import { createAsyncAction } from 'typesafe-actions';

import { User } from './models';

export const LOGIN_REQUEST = 'auth/LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';
export const SET_AUTH_TOKEN = 'auth/SET_AUTH_TOKEN';

export const loginActions = createAsyncAction(
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
)<void, User, Error>();
