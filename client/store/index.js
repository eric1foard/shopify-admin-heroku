import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import reducers from '../reducers';

let preloadedState = {};

if (window) {
  // Grab the state from a global variable injected into the server-generated HTML
  preloadedState = window.__PRELOADED_STATE__
  // Allow the passed state to be garbage-collected
  delete window.__PRELOADED_STATE__
}

const middleware = applyMiddleware(ReduxPromise, ReduxThunk, logger);
const store = createStore(reducers, preloadedState, middleware);

export default store;
