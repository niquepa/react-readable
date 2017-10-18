import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
// import Thunk from 'redux-thunk';
import reducer from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(
  reducer,
  composeEnhancers,
);
export default store;
