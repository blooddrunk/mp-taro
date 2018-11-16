import { takeLatest, call, put, select, cancelled } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import { RootState } from '..';
import { PostsState } from '../posts';
import { callApi } from '../../services';
import * as postsActions from './actions';
import { PostResponse } from './models';

export function* postsSaga() {
  // worker
  function* fetchPosts() {
    try {
      // add some delay
      yield delay(1000);

      const { nextPage, pageSize }: PostsState = yield select<RootState>(
        state => state.posts
      );
      const response: PostResponse = yield call(callApi, {
        url: `${process.env.API_ROOT}/posts`,
        data: {
          _page: nextPage,
          _limit: pageSize,
        },
      });
      yield put(postsActions.success(response));
      return response;
    } catch (error) {
      if (yield cancelled()) {
        // TODO task has been cancelled but Taro doesn't support request aborting
      }
      yield put(postsActions.failure(error));
    }
  }

  // watcher
  function* watchFetchPosts() {
    yield takeLatest(postsActions.FETCH_POSTS_REQUEST, fetchPosts);
  }

  yield watchFetchPosts();
}
