import { combineReducers } from 'redux';
import productsReducer from './reducer_products';

const rootReducer = combineReducers({
  products: productsReducer
});

export default rootReducer;