import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import reducers from "./reducers";
import sagas from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const store = createStore(
  reducers,
  {},
  composeEnhancers(applyMiddleware(...middlewares))
);

export function configureStore() {
  return store;
}

sagaMiddleware.run(sagas);

export default store;
