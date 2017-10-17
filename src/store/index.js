import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
// import { reducer as toastrReducer } from 'react-redux-toastr';
// import Thunk from 'redux-thunk';
// import SignApp from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = {
  // signApp: SignApp,
  // toastr: toastrReducer,
};

const reducer = combineReducers(reducers);

const store = createStore(
  reducer,
  // composeEnhancers(applyMiddleware(Thunk)),
);

export default store;
