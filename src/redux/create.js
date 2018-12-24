import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducerCreate from './reducer';
import clientMiddleware from './middleware/apiClient';
import appErrorMiddleware from './middleware/appError';

export default (client, data) => {
  const middleware = [clientMiddleware(client), appErrorMiddleware, thunk];

  let finalCreateStore;
  if (__DEVELOPMENT__ && __DEVTOOLS__) {
    finalCreateStore = compose(
      applyMiddleware(...middleware)
    )(_createStore);
  } else {
    finalCreateStore = applyMiddleware(...middleware)(_createStore);
  }

  const reducer = reducerCreate();
  const store = finalCreateStore(reducer, data);

  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('./reducer', () => {
      store.replaceReducer(reducerCreate());
    });
  }

  return store;
};
