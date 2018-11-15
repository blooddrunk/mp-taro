import { ActionType, getType } from 'typesafe-actions';
import produce from 'immer';

import * as postsActions from './actions';
import { Post } from './models';

export type PostsActions = ActionType<typeof postsActions>;

export type PostsState = Readonly<{
  items: Post[];
  total: number;
  loading: boolean;
  error: Error | null;
  hasMore: boolean;
  nextPage: number;
  pageSize: number;
  shouldClearItems: boolean;
}>;

export const postsIntialState: PostsState = {
  items: [],
  total: 0,
  loading: false,
  error: null,
  hasMore: true,
  nextPage: 1,
  pageSize: 20,
  shouldClearItems: false,
};

export const posts = produce<PostsState, PostsActions>((draft, action) => {
  switch (action.type) {
    case getType(postsActions.request):
      draft.loading = true;
      draft.error = null;
      draft.hasMore = true;
      draft.shouldClearItems = action.payload.shouldClearItems;

      if (action.payload.shouldClearItems) {
        draft.nextPage = 1;
      } else {
        draft.nextPage += 1;
      }
      return;
    case getType(postsActions.success):
      if (draft.shouldClearItems) {
        draft.items = action.payload.items;
      } else {
        draft.items = [...draft.items, ...action.payload.items];
      }
      draft.total = action.payload.total;
      draft.loading = false;
      return;
    case getType(postsActions.failure):
      draft.error = action.payload;
      return;
    case getType(postsActions.clearError):
      draft.error = null;
      return;
  }
}, postsIntialState);
