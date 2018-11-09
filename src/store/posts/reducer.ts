import { ActionType, getType } from 'typesafe-actions';
import produce from 'immer';

import { postsActions } from './actions';
import { Post, PostResponse } from './models';

export type PostsActions = ActionType<typeof postsActions>;

export type PostsState = Readonly<{
  items: Post[];
  total: number;
  loading: boolean;
  error: Error | null;
}>;

export const postsIntialState: PostsState = {
  items: [],
  total: 0,
  loading: false,
  error: null,
};

export const posts = produce<PostsState, PostsActions>((draft, action) => {
  switch (action.type) {
    case getType(postsActions.request):
      return {
        ...postsIntialState,
        loading: true,
      };
    case getType(postsActions.success):
      draft.items = action.payload.items;
      draft.total = action.payload.total;
      draft.loading = false;
      return;
    case getType(postsActions.failure):
      draft.error = action.payload;
      return;
  }
}, postsIntialState);
