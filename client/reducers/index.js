import { combineReducers } from 'redux';
import productsReducer from './reducer_products';
import productPickerReducer from './reducer_product_picker';

const rootReducer = combineReducers({
  products: productsReducer,
  productPickerModalOpen: productPickerReducer
});

export default rootReducer;