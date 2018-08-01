import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Page, AppProvider } from '@shopify/polaris';
import ProductList from './components/ProductList';
import ProductPicker from './components/ProductPicker';
import {
  setProductPickerOpen,
  addSelectedProducts,
  onFiltersChange,
  getProducts
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
          />
          <ProductPicker
            setProductPickerOpen={this.props.setProductPickerOpen}
            productPickerModalOpen={this.props.productPickerModalOpen}
            addSelectedProducts={this.props.addSelectedProducts}
          />
        </Page>
      </AppProvider>
    );
  }
}

const mapStateToProps = ({ productPickerModalOpen, products, appliedFilters }) => {
  return {
    productPickerModalOpen,
    products,
    appliedFilters
  };
};

const mapDispatchToProps = (dispatch) => {
  const actionCreators = {
    setProductPickerOpen,
    addSelectedProducts,
    onFiltersChange,
    getProducts
  };
  return bindActionCreators(actionCreators, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
