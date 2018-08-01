import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Page, AppProvider } from '@shopify/polaris';
import ProductList from './components/ProductList';
import ProductPicker from './components/ProductPicker';
import EditModal from './components/EditModal';
import {
  setProductPickerOpen,
  addSelectedProducts,
  onFiltersChange,
  getProducts,
  setEditModalOpen
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
          <ProductList
            products={this.props.products}
            setProductPickerOpen={this.props.setProductPickerOpen}
            appliedFilters={this.props.appliedFilters}
            onFiltersChange={this.props.onFiltersChange}
            setEditModalOpen={this.props.setEditModalOpen}
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
        </Page>
      </AppProvider>
    );
  }
}

const mapStateToProps = ({ productPickerModalOpen, products, appliedFilters, isEditModalOpen }) => {
  return {
    productPickerModalOpen,
    products,
    appliedFilters,
    isEditModalOpen
  };
};

const mapDispatchToProps = (dispatch) => {
  const actionCreators = {
    setProductPickerOpen,
    addSelectedProducts,
    onFiltersChange,
    getProducts,
    setEditModalOpen
  };
  return bindActionCreators(actionCreators, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
