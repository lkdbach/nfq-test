import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import createRootReducer from './reducers';
import rootSagas from './middlewares';

const sagaMiddleware = createSagaMiddleware();

const getMiddleware = () => {
  return applyMiddleware(sagaMiddleware);
};

export default function configureStore() {
  let store;
  if (process.env.NODE_ENV !== 'production') {
    store = createStore(
      createRootReducer(),
      composeWithDevTools(getMiddleware())
    );
    if (module.hot) {
      module.hot.accept('./reducers', () => {
        store.replaceReducer(createRootReducer());
      });
    }
  } else {
    store = createStore(createRootReducer(), getMiddleware());
  }
  sagaMiddleware.run(rootSagas);
  return store;
}
