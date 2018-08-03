import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Page, AppProvider } from '@shopify/polaris';
import ProductList from './components/ProductList';
import ProductPicker from './components/ProductPicker';
import EditModal from './components/EditModal';
import DeleteAlert from './components/DeleteAlert';
import StatusBanner from './components/StatusBanner';
import {
  setProductPickerOpen,
  addSelectedProducts,
  onFiltersChange,
  getProducts,
  setEditModalOpen,
  setDeleteAlertOpen,
  deleteProductAndCloseModal,
  showBanner,
  hideBanner
} from './actions/index';


class App extends Component {
  componentWillMount() {
    this.props.getProducts();
  }

  render() {
    const { apiKey, shopOrigin } = window;

    return (
      <AppProvider shopOrigin={shopOrigin} apiKey={apiKey}>
        <Page
          title='Augmented Reality Client'
          primaryAction={{ content: 'Add Products', onAction: () => this.props.setProductPickerOpen(true) }}
        >
          <StatusBanner
            visible={this.props.banner.visible}
            status={this.props.banner.status}
            title={this.props.banner.title}
            message={this.props.banner.message}
            hideBanner={this.props.hideBanner}
          />
          <ProductList
            products={this.props.products}
            setProductPickerOpen={this.props.setProductPickerOpen}
            appliedFilters={this.props.appliedFilters}
            onFiltersChange={this.props.onFiltersChange}
            setEditModalOpen={this.props.setEditModalOpen}
            setDeleteAlertOpen={this.props.setDeleteAlertOpen}
          />
          <ProductPicker
            setProductPickerOpen={this.props.setProductPickerOpen}
            productPickerModalOpen={this.props.productPickerModalOpen}
            addSelectedProducts={this.props.addSelectedProducts}
          />
          <EditModal
            isEditModalOpen={this.props.isEditModalOpen}
            setEditModalOpen={this.props.setEditModalOpen}
          />
          <DeleteAlert
            isDeleteAlertOpen={this.props.isDeleteAlertOpen}
            setDeleteAlertOpen={this.props.setDeleteAlertOpen}
            deleteProductOpts={this.props.deleteProductOpts}
            deleteProductAndCloseModal={this.props.deleteProductAndCloseModal}
          />
        </Page>
      </AppProvider>
    );
  }
}

const mapStateToProps = (
  { productPickerModalOpen,
    products,
    appliedFilters,
    isEditModalOpen,
    isDeleteAlertOpen,
    deleteProductOpts,
    banner
  }
) => {
  return {
    productPickerModalOpen,
    products,
    appliedFilters,
    isEditModalOpen,
    isDeleteAlertOpen,
    deleteProductOpts,
    banner
  };
};

const mapDispatchToProps = (dispatch) => {
  const actionCreators = {
    setProductPickerOpen,
    addSelectedProducts,
    onFiltersChange,
    getProducts,
    setEditModalOpen,
    setDeleteAlertOpen,
    deleteProductAndCloseModal,
    showBanner,
    hideBanner
  };
  return bindActionCreators(actionCreators, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
