import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import reducers from '../reducers';

const middleware = applyMiddleware(ReduxPromise, ReduxThunk, logger);
const store = createStore(reducers, middleware);

export default store;
