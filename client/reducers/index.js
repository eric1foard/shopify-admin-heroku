import { combineReducers } from 'redux';
import productsReducer from './reducer_products';
import productPickerReducer from './reducer_product_picker';
import filtersReducer from './reducer_filters';
import editModalReducer from './reducer_edit_modal';

const rootReducer = combineReducers({
  products: productsReducer,
  productPickerModalOpen: productPickerReducer,
  appliedFilters: filtersReducer,
  isEditModalOpen: editModalReducer
});

export default rootReducer;