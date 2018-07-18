import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import reducers from '../reducers';

const middleware = applyMiddleware(thunkMiddleware, logger);
const store = createStore(reducers, middleware);

export default store;
