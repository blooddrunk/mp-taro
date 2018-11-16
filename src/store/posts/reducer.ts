import { ActionType, getType } from 'typesafe-actions';
import produce from 'immer';

import * as postsActions from './actions';
import { Post } from './models';

export type PostsActions = ActionType<typeof postsActions>;

export type PostsState = Readonly<{
  items: Post[];
  currentSize: number;
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
  currentSize: 0,
  total: 0,
  loading: false,
  error: null,
  hasMore: true,
  nextPage: 1,
  pageSize: 10,
  shouldClearItems: false,
};

export const posts = produce<PostsState, PostsActions>((draft, action) => {
  switch (action.type) {
    case getType(postsActions.request):
      draft.loading = true;
      draft.error = null;
      draft.hasMore = true;
      draft.shouldClearItems = action.payload.shouldClearItems;

      if (draft.shouldClearItems) {
        draft.nextPage = 1;
      } else {
        draft.nextPage += 1;
      }

      return;
    case getType(postsActions.success):
      draft.total = action.payload.total;
      draft.loading = false;

      if (action.payload.items.length <= 0) {
        draft.hasMore = false;
        draft.nextPage -= 1;
      }

      if (draft.shouldClearItems) {
        draft.items = action.payload.items;
        draft.currentSize = draft.items.length;
      } else if (draft.hasMore) {
        draft.items = [...draft.items, ...action.payload.items];
        draft.currentSize += action.payload.items.length;
      }

      return;
    case getType(postsActions.failure):
      draft.error = action.payload;
      return;
    case getType(postsActions.clearError):
      if (!draft.shouldClearItems) {
        draft.nextPage -= 1;
      }

      draft.error = null;
      return;
  }
}, postsIntialState);
