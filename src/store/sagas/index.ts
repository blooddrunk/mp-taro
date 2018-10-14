import { effects } from 'redux-saga/dist/redux-saga';

import { sagas as counterSagas } from '../modules/counter';

const { all } = effects;

// single entry point to start all Sagas at once
export function* rootSaga() {
  yield all([counterSagas()]);
}
