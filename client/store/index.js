import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import logger from 'redux-logger';
import reducers from '../reducers';

const middleware = applyMiddleware(ReduxPromise, logger);
const store = createStore(reducers, middleware);

export default store;
