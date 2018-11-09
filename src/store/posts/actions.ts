import { createAsyncAction } from 'typesafe-actions';

import { PostResponse } from './models';

export const FETCH_POSTS_REQUEST = 'posts/FETCH_POSTS_REQUEST';
export const FETCH_POSTS_SUCCESS = 'posts/FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'posts/FETCH_POSTS_FAILURE';

export const postsActions = createAsyncAction(
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE
)<void, PostResponse, Error>();
