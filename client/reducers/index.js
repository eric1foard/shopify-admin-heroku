import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import productsReducer from './reducer_products';
import productPickerReducer from './reducer_product_picker';
import filtersReducer from './reducer_filters';
import deleteAlertReducer from './reducer_delete_alert';
import deleteProductOptsReducer from './reducer_delete_product_opts';
import bannerReducer from './reducer_banner';
import paginationReducer from './reducer_pagination';
import searchReducer from './reducer_search';
import loadingReducer from './reducer_loading';
import pageReducer from './reducer_page';

const rootReducer = combineReducers({
  products: productsReducer,
  productPickerModalOpen: productPickerReducer,
  appliedFilters: filtersReducer,
  isDeleteAlertOpen: deleteAlertReducer,
  deleteProductOpts: deleteProductOptsReducer,
  banner: bannerReducer,
  pagination: paginationReducer,
  search: searchReducer,
  isLoading: loadingReducer,
  page: pageReducer,
  form: formReducer
});

export default rootReducer;