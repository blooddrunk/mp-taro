import { createStandardAction } from 'typesafe-actions';

import { PostRequest, PostResponse } from './models';

export const FETCH_POSTS_REQUEST = 'posts/FETCH_POSTS_REQUEST';
export const FETCH_POSTS_SUCCESS = 'posts/FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'posts/FETCH_POSTS_FAILURE';
export const CLEAR_POSTS_ERROR = 'posts/CLEAR_POSTS_ERROR';

export const request = createStandardAction(FETCH_POSTS_REQUEST)<PostRequest>();
export const success = createStandardAction(FETCH_POSTS_SUCCESS)<
  PostResponse
>();
export const failure = createStandardAction(CLEAR_POSTS_ERROR)<Error>();
export const clearError = createStandardAction(FETCH_POSTS_FAILURE)<void>();
