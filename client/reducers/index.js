import { combineReducers } from 'redux';
import productsReducer from './reducer_products';
import productPickerReducer from './reducer_product_picker';
import filtersReducer from './reducer_filters';
import editModalReducer from './reducer_edit_modal';
import deleteAlertReducer from './reducer_delete_alert';

const rootReducer = combineReducers({
  products: productsReducer,
  productPickerModalOpen: productPickerReducer,
  appliedFilters: filtersReducer,
  isEditModalOpen: editModalReducer,
  isDeleteAlertOpen: deleteAlertReducer
});

export default rootReducer;