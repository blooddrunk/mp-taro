import { createStore, applyMiddleware, Store } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware, { END } from 'redux-saga';

import { root, rootSaga, RootState, RootAction } from '.';

export interface EnhancedStore extends Store<RootState, RootAction> {
  runSaga?: (rootSaga?: any) => any;
  close?: () => any;
}

export const configureStore = (preloadedState?: object) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [thunk, sagaMiddleware];

  if (process.env.NODE_ENV === 'development') {
    const { logger } = require('redux-logger');

    middlewares.push(logger);
  }

  const store: EnhancedStore = createStore(
    root,
    preloadedState!,
    applyMiddleware(...middlewares)
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('.', () => {
      const nextRootReducer = require('.').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);

  return store;
};

export const store = configureStore();
store.runSaga!(rootSaga);
