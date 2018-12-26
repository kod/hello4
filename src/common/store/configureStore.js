import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '@/common/reducers';
import rootSaga from '@/common/sagas';

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();

  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    process.env.NODE_ENV === 'development' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose;
  /* eslint-enable no-underscore-dangle */

  const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));

  const store = createStore(rootReducer, undefined, enhancer);
  sagaMiddleware.run(rootSaga);

  return { store };
}
