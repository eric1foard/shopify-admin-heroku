import { combineReducers } from 'redux';
import productsReducer from './reducer_products';
import productPickerReducer from './reducer_product_picker';
import filtersReducer from './reducer_filters';
import editModalReducer from './reducer_edit_modal';
import deleteAlertReducer from './reducer_delete_alert';
import deleteProductOptsReducer from './reducer_delete_product_opts';
import bannerReducer from './reducer_banner';

const rootReducer = combineReducers({
  products: productsReducer,
  productPickerModalOpen: productPickerReducer,
  appliedFilters: filtersReducer,
  isEditModalOpen: editModalReducer,
  isDeleteAlertOpen: deleteAlertReducer,
  deleteProductOpts: deleteProductOptsReducer,
  banner: bannerReducer
});

export default rootReducer;