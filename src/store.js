import { createStore } from 'redux';
import bookListReducer from './reducers/index';

const store = createStore(
  bookListReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
