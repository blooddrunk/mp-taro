import { takeLatest, call, put } from 'redux-saga/effects';

import { login } from '../../services';
import { loginActions, LOGIN_REQUEST } from './actions';

export function* authSaga() {
  // worker
  function* authorize() {
    try {
      const user = yield call(login);
      yield put(loginActions.success(user));
      return user;
    } catch (error) {
      yield put(loginActions.failure(error));
    }
  }

  // watcher
  function* watchAuthorize() {
    yield takeLatest(LOGIN_REQUEST, authorize);
  }

  yield watchAuthorize();
}
