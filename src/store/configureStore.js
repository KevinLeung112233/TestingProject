import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import reducers from "../reducers";
import sagas from "../sagas";

const sagaMiddleware = createSagaMiddleware();
const reducer = reducers;

const configureStore = (data = {}) => {
  const store = createStore(reducer, applyMiddleware(sagaMiddleware));
  if (sagaMiddleware) {
    sagaMiddleware.run(sagas);
  }
  return {
    store
  };
};

export default configureStore;
