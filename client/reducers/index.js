import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import productsReducer from './reducer_products';
import productPickerReducer from './reducer_product_picker';
import filtersReducer from './reducer_filters';
import deleteAlertReducer from './reducer_delete_alert';
import deleteProductOptsReducer from './reducer_delete_product_opts';
import bannerReducer from './reducer_banner';

const rootReducer = combineReducers({
  products: productsReducer,
  productPickerModalOpen: productPickerReducer,
  appliedFilters: filtersReducer,
  isDeleteAlertOpen: deleteAlertReducer,
  deleteProductOpts: deleteProductOptsReducer,
  banner: bannerReducer,
  form: formReducer
});

export default rootReducer;