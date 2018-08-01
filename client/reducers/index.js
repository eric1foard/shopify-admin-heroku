import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import productsReducer from './reducer_products';
import productPickerReducer from './reducer_product_picker';
import filtersReducer from './reducer_filters';
import editModalReducer from './reducer_edit_modal';

const rootReducer = combineReducers({
  products: productsReducer,
  productPickerModalOpen: productPickerReducer,
  appliedFilters: filtersReducer,
  isEditModalOpen: editModalReducer,
  editForm: formReducer
});

export default rootReducer;