import { takeLatest, call, put } from 'redux-saga/effects';

import { callApi } from '../../services';
import { postsActions, FETCH_POSTS_REQUEST } from './actions';
import { PostResponse } from './models';

export function* postsSaga() {
  // worker
  function* fetchPosts() {
    try {
      const response: PostResponse = yield call(callApi, {
        url: `${process.env.API_ROOT}/posts`,
        data: {
          _page: 1,
          _limit: 20,
        },
      });
      yield put(postsActions.success(response));
      return response;
    } catch (error) {
      yield put(postsActions.failure(error));
    }
  }

  // watcher
  function* watchFetchPosts() {
    yield takeLatest(FETCH_POSTS_REQUEST, fetchPosts);
  }

  yield watchFetchPosts();
}
